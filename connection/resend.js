import { Resend } from "resend";

const resend = new Resend("re_Q6W9YHzr_CiEvDvhqznd36GFfaJNsZ8EU");

export async function correo() {
  const { data, error } = await resend.emails.send({
    from: "Symtechven <soporte@symtechven.com>",
    to: ["mospina@unimet.edu.ve", "escalonaf12@gmail.com"],
    subject: "Confirmacion de asistencia al evento",
    html: `
    <body style="width: 738px; margin: 0 auto">

   <h1>Pedido</h1>
  </body>
    `,
  });

  if (error) {
    return console.error({ error });
  }

  console.log({ data });
}
