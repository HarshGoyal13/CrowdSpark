import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { ClockLoader } from "react-spinners";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleFormChange = (fieldname, e) => {
    setFormData({ ...formData, [fieldname]: e.target.value });
  };

  const sendMail = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("https://crowdspark.onrender.com/api/v1/contactUs", formData);

      if (res.data?.code === 200) {
        toast.success("Mail sent successfully");
        setFormData({ name: "", email: "", subject: "", message: "" });
      } else {
        throw new Error(res.data?.status || "Unexpected error occurred");
      }
    } catch (error) {
      console.error("Error:", error.message);
      toast.error("Error sending mail. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form className="flex flex-col gap-7" onSubmit={sendMail}>
        <div className="flex flex-col gap-5 lg:flex-row">
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="name" className="label-style">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Enter name"
              className="form-style"
              value={formData.name}
              onChange={(e) => handleFormChange("name", e)}
            />
          </div>
          <div className="flex flex-col gap-2 lg:w-[48%]">
            <label htmlFor="subject" className="label-style">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              id="subject"
              placeholder="Enter subject"
              className="form-style"
              value={formData.subject}
              onChange={(e) => handleFormChange("subject", e)}
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="email" className="label-style">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter email address"
            className="form-style"
            value={formData.email}
            onChange={(e) => handleFormChange("email", e)}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="message" className="label-style">
            Message
          </label>
          <textarea
            name="message"
            id="message"
            cols="30"
            rows="7"
            placeholder="Enter your message here"
            className="form-style"
            value={formData.message}
            onChange={(e) => handleFormChange("message", e)}
          />
        </div>

        <button
          type="submit"
          className="flex items-center justify-center rounded-md bg-yellow-50 px-6 py-3 text-center text-[13px] font-bold text-black shadow-[2px_2px_0px_0px_rgba(255,255,255,0.18)] sm:text-[16px]"
        >
          {loading ? <ClockLoader color="yellow" size={24} /> : "Submit Form"}
        </button>
      </form>
    </div>
  );
}
