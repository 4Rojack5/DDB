/* se crean constantes para traer los datos de las entradas del formulario */
/* constants are created to bring the data from the inputs of the form */

const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');

//Se agregan expresiones regulares para verificar caracteres
//Regular expressions are added to check characters

const expresiones = {
    nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Las letras y los espacios pueden llevar acentos. //Letters and spaces, can carry accents.
    tdocumento: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, //Las letras y los espacios pueden llevar acentos. //Letters and spaces can carry accents.
    telefono: /^\d{7,14}$/, //7 a 14 números. //7 to 14 numbers.
    celectronico: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	ndocumento: /^\d{7,14}$/ //7 a 14 números. //7 to 14 numbers.
}

//Se crea el objeto llamado campos.
//Object called campos is created.

const campos = {
    nombre: false,
    tdocumento: false,
    telefono: false,
    celectronico: false,
	ndocumento: false
}

//Se crea una constante para validar el formulario, además se crea un switch para cada caso específico.
//A constant is created to validate the form, in addition a switch is created for each specific case.

const validarFormulario = (e) => {
    switch (e.target.name){
        case "nombre":
            validarCampo(expresiones.nombre, e.target, 'nombre');
        break;
        case "tdocumento":
            validarCampo(expresiones.tdocumento, e.target, 'tdocumento');
        break;
        case "telefono":
            validarCampo(expresiones.telefono, e.target, 'telefono');
        break;
        case "celectronico":
            validarCampo(expresiones.celectronico, e.target, 'celectronico');
        break;
        case "ndocumento":
            validarCampo(expresiones.ndocumento, e.target, 'ndocumento');
        break;
    }
}

//En esta constante se validan los campos y se cambian los favicons, además de poner error si no se rellenan los campos.
//In this constant the fields are validated and the favicons are changed, in addition to putting an error if the fields are not filled in.

const validarCampo = (expresion, input, campo) => {
    if(expresion.test(input.value)){
        document.getElementById(`${campo}-group`).classList.remove('form-group-incorrecto');
        document.getElementById(`${campo}-group`).classList.add('form-group-correcto');
        document.querySelector(`#${campo}-group i`).classList.add('fa-check-circle');
        document.querySelector(`#${campo}-group i`).classList.remove('fa-circle-xmark'); 
        document.querySelector(`#${campo}-group .input-error`).classList.remove('input-error-activo');   
        campos[campo] = true;  
    }else{
        document.getElementById(`${campo}-group`).classList.add('form-group-incorrecto');
        document.getElementById(`${campo}-group`).classList.remove('form-group-correcto');
        document.querySelector(`#${campo}-group i`).classList.add('fa-circle-xmark');
        document.querySelector(`#${campo}-group i`).classList.remove('fa-check-circle'); 
        document.querySelector(`#${campo}-group .input-error`).classList.add('input-error-activo');
        campos[campo] = false; 
    }
}
//Se agrega un eventlistener para comprobar que funciona.
//An eventlistener is added to check that it is working.

inputs.forEach((input) => {
    input.addEventListener('keyup', validarFormulario);
    input.addEventListener('blur', validarFormulario);
});

//Se crea un eventListener para prevenir que el boton no envie nada y despues se crea un if para comprobar que estén todos los campos completos para luego lanzar una alerta y un texto que valida toda la información sino lanza una alerta de que no se han llenado todos los campos.
//An eventListener is created to prevent the button from not sending anything and then an if is created to check that all the fields are complete and then launches an alert and a text that validates all the information, otherwise it launches an alert that not all of them have been filled out. fields.

formulario.addEventListener('submit', (e) => {
    e.preventDefault(); //para prevenir que redireccione a otro sitio. // to prevent you from redirecting to another site.

    const checkbox = document.getElementById('checkbox');
    if(campos.nombre && campos.tdocumento && campos.telefono && campos.celectronico && campos.ndocumento && checkbox.checked){
        formulario.reset();
        document.getElementById('group-success').classList.add('group-success-activo');
        alert("Los datos han sido enviados correctamente, muchas gracias por suscribirse!");
        setTimeout(() =>{
            document.getElementById('group-success').classList.remove('group-success-activo');
        }, 5000);

        document.querySelectorAll('.form-group-correcto').forEach((icono) => {
            icono.classList.remove('form-group-correcto');
        });
    }else{
        document.getElementById('form-message').classList.add('form-message-activo');
    }

});

/* Created By: Juan Felipe Rodríguez Rendón */