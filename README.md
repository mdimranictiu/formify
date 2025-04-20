# Project Name: Formify ( Build custom forms with zero code )


**Live Website:** [Formify](https://formify-taupe.vercel.app/) 

**Formify OverView**  
Formify is a custom form-building web application that allows users to design dynamic forms effortlessly through a drag-and-drop interface. Users can add various field types such as text fields, number inputs, textareas, and more.

Each form element can be customized — including field labels, default values, and even the name of each fieldset. Users can easily duplicate entire fieldsets, delete individual fields, and organize fields within fieldsets seamlessly.

Once the form is complete, users can save the form to instantly generate a clean, responsive, and user-friendly UI representation of their design

 ## 🖼 Screenshot  
![Formify](https://i.ibb.co/1GZvX6W5/Screenshot-20-4-2025-23713-formify-taupe-vercel-app.jpg)

## 📖 Table of Contents

- [Features](#features)
- [Technologies Used](#technologies-used)
- [Challenges](#Challenges)
- [Dependencies used](#dependencies-used)
- [Installation](#installation)


## Features  

- **Drag-and-Drop Builder**: Effortlessly add fields by dragging them into the canvas  
- **Custom Field Types**: Supports Text, Number, Date, Textarea, Select, Radio, and Checkbox fields  
- **Fieldset Management**: Create multiple fieldsets with custom names for better organization  
- **Field Customization**: Change field labels, default values, and more with a click  
- **Duplicate Fieldsets**: Clone entire fieldsets with unique names (e.g., “User Info copy1”)  
- **Delete Fields**: Remove any unwanted field or entire fieldset instantly  
- **Live Form Preview**: See a beautiful UI representation of your form upon saving  
- **Validation for Unique Fieldset Name**: Prevent duplicate fieldset names with error handling  
- **Responsive Design**: Fully responsive UI for both desktop and mobile views  
- **Save & Retrieve Form**: Save designed form to backend and get clean formatted response  

---

##  Tech Used 

- **React.js** – UI Library  
- **Tailwind CSS** – Styling  
- **@hello-pangea/dnd** – Drag and Drop library  
- **Axios** – For HTTP requests  
- **Custom Context API** – For State Management 

## 💥 Challenges

- **Real-Time Updates**: Managed dynamic field and fieldset updates without breaking the UI or data consistency.
- **Unique Fieldset Names**: Ensured unique names for each fieldset, especially when duplicating, by appending copy numbers.
- **Drag-and-Drop Flexibility**: Optimized drag-and-drop interactions for moving fields between fieldsets while maintaining form integrity.
- **Field Removal**: Prevented accidental deletions by adding confirmation and undo features.
- **Form Submission**: Ensured all dynamic fields and changes were correctly submitted to the backend.


  ---


## 📦 Dependencies  
The project uses the following npm packages:  
```
@eslint
@types/react-dom
@types/react
@vitejs/plugin-react
axios
daisyui
eslint-plugin-react-hooks
eslint-plugin-react-refresh
eslint-plugin-react
eslint
react-dom
react-icons
react-router-dom
react
sort-by
tailwindcss
@hello-pangea/dnd
vite
```

##  Installation & Setup  
Follow these steps to run the project locally:  
### 1 Clone the Client Repository  
```
git clone https://github.com/mdimranictiu/formify.git
cd formify
```

### 2 Install Dependencies
```
npm install
```
### 3 Start the Development Server
```
npm run dev
```

 ## Resources & Links
- React Documentation: https://react.dev
- Tailwind CSS Documentation: https://tailwindcss.com
- @hello-pangea: https://www.npmjs.com/package/@hello-pangea/dnd
- DaisyUI (Tailwind Components): https://daisyui.com
- VS Code: https://code.visualstudio.com

📌 Feel free to contribute, report issues, or share your feedback! 🚀