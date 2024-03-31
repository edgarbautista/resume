import React, { Component } from 'react';
import { hasAnyProps } from '../helpers/props';
import { submitForm } from '../services/googleFormService';

const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

class Contact extends Component {

   validateFields = ["name", "email", "subject", "message"]

   constructor(props) {
      super(props)
      this.state = {
         name: "",
         email: "",
         subject: "",
         message: "",
         submitted: false,
         submissionErrorMessage: "",
         errors: {}
      }
   }

   handleChange = (field, event) => {
      const change = {}
      change[field] = event.target.value
      this.setState(change)
      this.validate(field, event.target.value)
   }

   handleSubmit = async (e) => {
      e.preventDefault()
      if (this.state.submitted) return
      await this.validate("", "")
      if (!this.state.errors.formError) {
         try{
            await submitForm({ ...this.state })
         } catch(e) {
            this.setState({
               submitted: false,
               submissionErrorMessage: "Error while submitting form"
             })
             return
         }
         this.setState({ submitted: true, submissionErrorMessage: "" })
      }
   }

   setErrorState = (newState) => {
      this.setState({
         errors: {
            ...this.state.errors,
            ...newState,
            formError: this.preSubmitError(newState)
         }
      })
   }

   isInvalid = (field, name, value) => {
      const evaluate = field === name ? value : this.state[name]
      if (!evaluate) {
         return true
      }
      return false
   }

   validateName = (field, value) => {
      let validation = this.isInvalid(field, "name", value)
      if (validation) {
         return "Name is required"
      } else if (this.state.name) {
         return ""
      }
      return this.state.errors.name
   }

   validateEmail = (field, value) => {
      const validaton = this.isInvalid(field, "email", value)
      if (validaton) {
         return "Email is required"
      } else if (!!this.state.email && field === "email") {
         if ((EMAIL_REGEX.test(this.state.email))) {
            return ""
         } else {
            return "Not a valid email format"
         }
      }
      return this.state.errors.email
   }

   validateSubject = (field, value) => {
      const validation = this.isInvalid(field, "subject", value)
      if (validation) {
         return "Subject is required"
      } else if (this.state.subject) {
         return ""
      }

      return this.state.errors.subject
   }

   preSubmitError = (errors) => {
      if (Object.entries(errors).find(([key, value]) => !!value)) {
         return "Invalid form for submission"
      } else {
         return ""
      }
   }

   validate = async (field, value) => {
      await new Promise(resolve => setTimeout(resolve, 500));
      const errorState = {
         name: this.validateName(field, value),
         email: this.validateEmail(field, value),
         subject: this.validateSubject(field, value)
      }

      this.setErrorState(errorState)
   }

   render() {
      if (!hasAnyProps(this.props.contact)) return null
      const { street, city, state, zip, phone, email } = this.props.contact
      return (
          <section id="contact">
             <div>
                <h3>
                   {street} <br />
                   {city}, {state} {zip}<br />
                   <span>{email}</span><br />
                   <span>{phone}</span>
                </h3>
             </div>
          </section>
      );
   }
}

Contact.defaultProps = {
   contact: {
      name: null,
      street: null,
      city: null,
      state: null,
      zip: null,
      phone: null,
      email: null,
   }
};

export default Contact;
