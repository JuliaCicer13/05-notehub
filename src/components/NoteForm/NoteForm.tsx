import css from "../NoteForm/NoteForm.module.css"
import { useId } from "react";
import { Formik, Form, Field , type FormikHelpers} from "formik";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import type {Note} from "../../types/note";
import * as Yup from "yup";
import {createNote} from "../../services/noteService"

interface OrderFormValues {
  username: string;
  email: string;
  tag: string;
  onSuccess: () => void;
}

const initialValues: OrderFormValues = {
  username: "",
  email: "",
  tag: "",
};

export default function NoteForm ({onSuccess}: OrderFormValues) {
  const queryClient = useQueryClient();

const fieldId = useId();

const {mutate, isPending} = useMutation({
  mutationFn: (data: Note) => createNote(data)
});

 const handleCreateNote = [data: FormData] => {
      mutate({
      title: data.get("My new note") as string
    }, {
      onSuccess: () => {
       queryClient.invalidateQueries({queryKey: ("notes")});
       onSuccess();
      },
      onError: (error) => {
       console.log(error);
      }
    })
  }


const handleSubmit = (
  values: OrderFormValues,
  actions: FormikHelpers<OrderFormValues>
) => {
  console.log("Order data:", values);
  actions.resetForm();
}

const OrderFormSchema = Yup.object().shape({
  title: Yup.string()
  .min(3)
  .max(50)
  .required(),
  tag: Yup.string()
   .tag( "Todo","Work", "Personal", "Meeting", "Shopping")
   .required(),
});


return (
<Formik initialValues={initialValues}
        validationSchema={OrderFormSchema}
        onSubmit={() => {handleSubmit}}>
  <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-username`}>Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="tag">Tag</label>
    <Field as="select" id={`${fieldId}-tag`} name="tag" className={css.select}>
      <option value="Todo">Todo</option>
      <option value="Work">Work</option>
      <option value="Personal">Personal</option>
      <option value="Meeting">Meeting</option>
      <option value="Shopping">Shopping</option>
    </Field>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton}>
      Cancel
    </button>
    <button
      type="submit"
      className={css.submitButton}
      disabled=false
      onClick={handleCreateNote}
    >
      Create note
    </button>
  </div>
  </Form>
</Formik>
  )}