import css from "../NoteForm/NoteForm.module.css"
import { useId } from "react";
import { Formik, Form, Field} from "formik";
import { useMutation, useQueryClient} from '@tanstack/react-query';
import * as Yup from "yup";
import {createNote} from "../../services/noteService"
import {ErrorMessage} from "formik";
import Loader from "../Loader/Loader";

interface NoteFormProps {
 onSuccess: () => void;
}

interface FormValues {
  title: string,
  content: string,
  tag: string,
};

const initialValues: FormValues = {
  title: "",
  content: "",
  tag: "Todo",
};

export default function NoteForm ({onSuccess}: NoteFormProps) {
const queryClient = useQueryClient();
const fieldId = useId();

const {mutate, isPending} = useMutation({
  mutationFn: createNote,
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ["notes"]});
    onSuccess();
  },
  onError: () => {
    
  },
});


const validationSchema = Yup.object().shape({
  title: Yup.string().min(3).max(50).required("Title is required"),
  content: Yup.string().max(500 , "Max length is 500"),
  tag: Yup.string().required(),
});

const handleSubmit = (values: FormValues) => {
  mutate(values);
};

return (
<Formik initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}>
  <Form className={css.form}>
  <div className={css.formGroup}>
    <label htmlFor={`${fieldId}-title`}>Title</label>
    <Field id="title" type="text" name="title" className={css.input} />
    <ErrorMessage name="title" component="p" className={css.error}
    />
  </div>

  <div className={css.formGroup}>
    <label htmlFor="content">Content</label>
    <Field as="textarea"
      id="content"
      name="content"
      rows={8}
      className={css.textarea}
    />
     <ErrorMessage name="content" component="p" className={css.error}/>
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
     <ErrorMessage name="tag" component="p" className={css.error}/>
  </div>

  <div className={css.actions}>
    <button type="button" className={css.cancelButton} onClick={onSuccess}> Cancel</button>
    <button type="submit" className={css.submitButton} disabled={isPending}>
     {isPending ? <Loader/> : "Create note" }
    </button>
  </div>
  </Form>
</Formik>
  )}