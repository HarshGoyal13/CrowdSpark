import React from "react";
import ContactUsForm from "./ContactUsForm";

const ContactForm = () => {
  return (
    <div className="bg-richblack-800 text-white rounded-xl p-8 lg:p-14 flex flex-col items-center gap-6">
      <h1 className="text-3xl font-semibold text-center text-richblack-50">
        Need Help or Have Questions?
      </h1>
      <p className="text-center text-richblack-200">
        Whether you're facing an issue or have a question, we're here to help you get back on track.
      </p>

      <div className="mt-6 w-full max-w-md">
        <ContactUsForm />
      </div>

      <p className="mt-6 text-center text-richblack-200">
        Having trouble with something? <a href="/support" className="text-yellow-500 hover:underline">Visit our support page</a> for more info.
      </p>
    </div>
  );
};

export default ContactForm;
