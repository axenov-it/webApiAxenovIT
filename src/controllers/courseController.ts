import { sendMail } from "services/mailer";

/**
 * @swagger
 * /api/course/register:
 *   post:
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *              name:
 *                type: string
 *                required: true
 *              phone:
 *                type: string
 *              email:
 *                type: string
 *                required: true
 *              message:
 *                type: string
 *              course:
 *                type: string
 *                required: true
 */

export const register = async (req, res): Promise<void> => {
  const { name, phone, email, message, course } = req.body;

  await sendMail({
    from: email,
    to: process.env.MAILER_ADMIN,
    template: "courseRegistration",
    ctx: {
      name,
      email,
      phone,
      course,
      message,
    },
    subject: "New User",
  });

  res.json({
    status: 200,
    response:
      "Спасибо вы успешно подписаны на наш курс в ближайшее время мы с вами свяжемся",
  });
};
