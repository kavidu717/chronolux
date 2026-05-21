import PDFDocument from "pdfkit";
import Order from "../models/Order.js";

export const downloadInvoice = async (req, res) => {
  try {

    const order = await Order.findById(req.params.id)
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({
        message: "Order not found"
      });
    }

    // 🟢 PDF CREATE
    const doc = new PDFDocument();

    // headers
    res.setHeader(
      "Content-Type",
      "application/pdf"
    );

    res.setHeader(
      "Content-Disposition",
      `attachment; filename=invoice-${order._id}.pdf`
    );

    // pipe
    doc.pipe(res);

    // ================= PDF CONTENT =================

    doc.fontSize(25).text("LUXE WATCHES INVOICE", {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(14).text(`Order ID: ${order._id}`);
    doc.text(`Status: ${order.status}`);
    doc.text(`Date: ${new Date(order.createdAt).toDateString()}`);

    doc.moveDown();

    doc.fontSize(18).text("Products");

    doc.moveDown();

    order.items.forEach((item) => {
      doc.fontSize(12).text(
        `${item.productId.name} | Qty: ${item.quantity} | $${item.price}`
      );
    });

    doc.moveDown();

    doc.fontSize(18).text(
      `Total: $${order.totalAmount}`
    );

    doc.moveDown();

    doc.text("Thank you for shopping with us!");

    // finish
    doc.end();

  } catch (err) {
    res.status(500).json({
      message: err.message
    });
  }
};