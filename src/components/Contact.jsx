import { useState, useRef } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// template_lgmvadk
// service_cyg8aqb
// EBEjdnI5Mu8FNuWzw
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState(
    {
      name: "",
      email: "",
      message: ""
    }
  );
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { target } = e;
    const { name, value } = target;
    setForm({...form, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    emailjs
    .send(
        "service_cyg8aqb",
        "template_lgmvadk",
        {
          from_name: form.name,
          to_name: "Fernando Jauya",
          from_email: form.email,
          to_email: "fernandojauya30@gmail.com",
          message: form.message,
        },
        "EBEjdnI5Mu8FNuWzw"
      )
    .then(
        () => {
          setLoading(false);
          alert('Gracias. Me pondré en contacto contigo lo antes posible.');
          setForm({
            name: "",
            email: "",
            message: ""
          })
        },
        (error) => {
          setLoading(false);
          console.log(error.text);
          alert('Algo salió mal...');
        }
      );
  };
  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn('left','tween', 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        <p className={styles.sectionSubText}>Contacta conmigo</p>
        <h2 className={styles.sectionHeadText}>Contacto.</h2>
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Nombre</span>
            <input
              required 
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="¿Cual es tu nombre?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Email</span>
            <input
              required
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="¿Cual es tu email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>
          <label className='flex flex-col'>
            <span className="text-white font-medium mb-4">Tu mensaje</span>
            <textarea 
              required
              rows="7"
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="¿Que es lo que quieres decir?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          <button
            type="submit"
            className="bg-tertiary py-3 px-8 text-white rounded-xl outline-none w-fit font-bold shadow-md shadow-primary"
          >
            {loading ? 'Enviando...' : 'Enviar'}
          </button>
        </form>
      </motion.div>
      <motion.div
        variants={slideIn('right','tween', 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  )
}

export default SectionWrapper(Contact,"contact");