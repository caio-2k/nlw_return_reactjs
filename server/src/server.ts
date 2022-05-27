import express from "express";
import nodemailer from "nodemailer";
import { prisma } from "./prisma";

const app = express();

// need to place before routes, go into req and see json body
app.use(express.json());

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "d668034d702af4",
    pass: "ef5a1618bd5034",
  },
});

app.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;
  const feedback = await prisma.feedback.create({
    data: {
      // or only type, shorthand.
      type: type,
      comment,
      screenshot,
    },
  });

  await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Caio Vinicius <batata@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
      `<p>Tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}</p>`,
      `</div>`,
    ].join("\n"),
  });
  return res.status(201).json({ data: feedback });
});

app.listen(3333, () => {
  console.log("HTTP server running!");
});
