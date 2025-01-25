import { testimonials } from "../../../constants";

const Testimonials = () => {
  return (
    <div id="testimonials" className="mt-20 tracking-wide font-inter">
      {/* Nagłówek */}
      <h2 className="text-3xl sm:text-5xl lg:text-6xl text-center my-10 lg:my-20 font-bold">
        Opinie naszych użytkowników
      </h2>
      <p className="mb-8 text-lg text-center text-neutral-500 max-w-3xl mx-auto">
        Wasze opinie są dla nas bardzo ważne! Podziel się swoją opinią na temat
        aplikacji w zakładce <span className="font-semibold">"Kontakt"</span> i
        miej szanse na pojawienie się poniżej!
      </p>

      {/* Opinie */}
      <div className="flex flex-wrap justify-center gap-8">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className="w-full sm:w-1/2 lg:w-1/3 px-4 transition-transform transform hover:scale-105"
          >
            <div className="bg-gradient-to-r from-secondarylight to-white rounded-xl p-6 text-md shadow-lg hover:shadow-xl transition-shadow border border-neutral-300">
              <p className="italic text-neutral-800">{testimonial.text}</p>
              <div className="flex mt-8 items-center">
                <img
                  className="w-12 h-12 mr-4 rounded-full border border-neutral-200"
                  src={testimonial.image}
                  alt={testimonial.user}
                />
                <div>
                  <h6 className="font-semibold text-lg">{testimonial.user}</h6>
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
