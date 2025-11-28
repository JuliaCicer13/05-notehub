import css from "../SearchBox/SearchBox.module.css"
import {Formik, Form, Field, type FormikHelpers } from "formik";

interface OrderFormValues {
  username: string;
  email: string;
  tag: string;
  onSearch: (newValue: string) => void;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  tag: "",
  onSearch: (newValue: string) => void;
}

export default function SearchBox () {
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log("Order data:", values);
    actions.resetForm();
  }
 return (
   <Formik initialValues={{initialValues}} onSubmit={() => {handleSubmit}}>
    <Form className={css.form}>
  <Field
  className={css.input}
  type="text"
  placeholder="Search notes"
 />
    </Form>
   </Formik>   
  )
}