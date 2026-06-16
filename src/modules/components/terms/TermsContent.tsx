const sectionClassName = "flex flex-col gap-3";
const headingClassName = "text-base font-semibold text-brand-text";
const paragraphClassName =
  "text-sm leading-relaxed text-brand-text/80";

export default function TermsContent() {
  return (
    <div className="flex flex-col gap-8">
      <p className={paragraphClassName}>
        Melodiario es un proyecto personal de una desarrolladora independiente,
        creado con el fin de ofrecer un espacio íntimo, seguro y libre para
        registrar tus canciones diarias y emociones. Al utilizar este sitio,
        aceptas las condiciones que se detallan a continuación.
      </p>

      <section className={sectionClassName}>
        <h2 className={headingClassName}>Sobre tus datos y privacidad</h2>
        <p className={paragraphClassName}>
          Tus datos son completamente confidenciales. Independientemente del
          método de acceso que elijas (Google, email, etc.), no compartimos tu
          información con nadie. Tú tienes el control y acceso exclusivo a tus
          registros, los cuales incluyen una canción, una sintonía (emoción) y
          una nota breve del día.
        </p>
        <p className={paragraphClassName}>
          La única forma de compartir información es por decisión tuya: al hacer
          clic en nuestro botón de descargar o compartir, se generará una imagen
          con la canción elegida y un fondo atractivo basado en tu sintonía. El
          texto de tu nota breve nunca se incluirá en esta imagen.
        </p>
        <p className={paragraphClassName}>
          <strong className="font-medium text-brand-text">
            Tu cuenta es tuya:
          </strong>{" "}
          Puedes eliminar tu cuenta junto con todo tu historial de registros en
          cualquier momento que estimes conveniente desde el perfil. Los datos
          se borrarán de forma definitiva; lo único que sucederá es que te
          echaremos de menos.
        </p>
      </section>

      <section className={sectionClassName}>
        <h2 className={headingClassName}>
          Sobre datos de terceros y herramientas
        </h2>
        <p className={paragraphClassName}>
          <strong className="font-medium text-brand-text">Spotify:</strong>{" "}
          Melodiario utiliza la API pública de Spotify para buscar y mostrar
          canciones, incluyendo títulos, nombres de artistas y portadas de
          álbumes. Este sitio es independiente y no está afiliado, patrocinado
          ni respaldado oficialmente por Spotify. Todo el contenido musical está
          referenciado según sus reglas de uso.
        </p>
        <p className={paragraphClassName}>
          <strong className="font-medium text-brand-text">Vercel:</strong>{" "}
          Utilizamos la plataforma de Vercel para alojar este proyecto y hacer
          posible su URL. También ocupamos sus analíticas integradas, las cuales
          en ningún caso guardan información personal o identificable. Solo
          recopilan datos anónimos de tráfico para saber cuántas personas
          usuarias activas tenemos, lo que nos ayuda a planificar mejoras para
          el sitio.
        </p>
      </section>

      <section className={sectionClassName}>
        <h2 className={headingClassName}>Limitación de responsabilidad</h2>
        <p className={paragraphClassName}>
          Melodiario se proporciona como un servicio gratuito y de uso
          recreativo/personal. Aunque pongo todo mi esfuerzo y cariño de
          programadora en mantener el sitio seguro, estable y optimizado, no
          puedo garantizar que el servicio nunca sufra interrupciones, caídas
          del servidor o errores imprevistos. Melodiario no se hace responsable
          por la pérdida eventual de datos o por fallas técnicas ajenas a mi
          control (como cambios repentinos en las APIs de terceros). Sin embargo,
          en soporte siempre estaré disponible a recopilar cualquier tipo de
          imprevisto que puedan suceder mientras utilizas la aplicación y haré
          todo lo que esté en mi poder y capacidades para poder ayudarte.
        </p>
      </section>
    </div>
  );
}
