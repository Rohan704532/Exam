import * as yup from "yup"

export const validation = yup.object({
    symbol:yup.string().required("Please enter some values"),
    date:yup.date().required("You need to select something")
})