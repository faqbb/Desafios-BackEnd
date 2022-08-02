const template = Handlebars.compile(`<ul>
<li>{{nombre}}</li>
<li>{{apellido}}</li>
<li>{{edad}}</li>
<li>{{mail}}</li>
<li>{{telefono}}</li>
</ul>`)
const htmlFinal = template({
    nombre:"Facundo",
    apellido:"Barberia",
    edad:19,
    mail: "facundito@gmail.com",
    telefono:"123123123"
})

document.getElementById('data').innerHTML=htmlFinal