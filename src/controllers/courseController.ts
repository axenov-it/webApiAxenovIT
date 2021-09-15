import { sendMail } from "services/mailer";

/**
 * @swagger
 * /course/register:
 *   post:
 *      parameters:
 *        - name: email
 *          in: query
 *          type: string
 *      responses:
 *       200:
 *         description: Response success message
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
