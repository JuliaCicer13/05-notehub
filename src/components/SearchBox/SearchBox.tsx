import css from "../SearchBox/SearchBox.module.css"
import {Formik, Form, Field, type FormikHelpers } from "formik";

interface OrderFormFunction {
    search: string;
    onSearch: (newValue: string) => void;
}
interface OrderFormValues {
  search: string;
  tag: string;
}

const initialValues: OrderFormValues = {
  search: "",
  tag: "",
}

export default function SearchBox ({search, onSearch}: OrderFormFunction) {
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
  defaultValue={search}
  onChange={onSearch}
  placeholder="Search notes"
 />
    </Form>
   </Formik>   
  )
}