import { testimonials } from "../../../constants";

const Testimonials = () => {
  return (
    <div  id="testimonials" className="mt-20 tracking-wide font-inter">
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20">
        Opinie naszych użytkowników
      </h2>
      <div className="flex flex-wrap justify-center">
        <p className='mb-4 text-lg text-center text-neutral-500 max-w-4xl '>
            Wasze opinie są dla nas bardzo ważne!
            Podziel się swoją opinią na temat aplikacji w zakładce "Kontakt" i miej szanse na pojawienie się poniżej!
            </p>
        {testimonials.map((testimonial, index) => (
          <div key={index} className="w-full sm:w-1/2 lg:w-1/3 px-4 py-2">
            <div className="bg-secondarylight rounded-md p-6 text-md border border-neutral-800 font-thin">
              <p>{testimonial.text}</p>
              <div className="flex mt-8 items-start">
                <img
                  className="w-12 h-12 mr-6 rounded-full border border-neutral-300"
                  src={testimonial.image}
                  alt=""
                />
                <div>
                  <h6>{testimonial.user}</h6>
                  <span className="text-sm font-normal italic text-neutral-600">
                    {testimonial.company}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Testimonials;