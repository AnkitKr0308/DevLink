import React, {
  useImperativeHandle,
  useRef,
  useState,
  forwardRef,
  useEffect,
} from "react";

function Input({ fields = [] }, ref) {
  const [formValues, setFormValues] = useState(() =>
    fields.reduce((acc, field) => {
      acc[field.id] = field.defaultValue || "";
      return acc;
    }, {})
  );

  useEffect(() => {
    formRef.current = { ...formValues };
  }, [formValues]);

  const formRef = useRef({});

  //useImperativeHandle is a React hook that lets you customize the instance value that is exposed when using ref with forwardRef.
  useImperativeHandle(ref, () => ({
    getFormData: () => ({ ...formRef.current }),
    resetForm: () => {
      const resetValue = fields.reduce((acc, field) => {
        acc[field.id] = "";
        return acc;
      }, {});
      setFormValues(resetValue);
    },
  }));

  const handleChange = (e) => {
    e.preventDefault();
    const { id, value } = e.target;
    setFormValues((prev) => ({ ...prev, [id]: value }));
  };

  return (
    <form>
      <div className="mb-6 ">
        {fields.map((field) => (
          <div key={field.id} className="mb-4 md:mb-0">
            <label
              htmlFor={field.id}
              className=" mb-1 text-sm flex ml-2 mt-3 justify-start font-medium text-gray-900 dark:text-black"
            >
              {field.label}
            </label>
            <input
              type={field.type || "text"}
              value={formValues[field.id] || ""}
              name={field.name}
              id={field.id}
              placeholder={field.placeholder || ""}
              required={field.required}
              onChange={handleChange}
              pattern={field.pattern}
              readOnly={field.readOnly}
              className={`${
                field.size === "large"
                  ? "w-full h-[8vh] px-4 py-3 text-base"
                  : "w-1/2 px-3 py-2 text-sm"
              }  bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-[30vw] p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500`}
            />
          </div>
        ))}
      </div>
    </form>
  );
}

export default forwardRef(Input);
