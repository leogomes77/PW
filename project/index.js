var pagina = 2;

function procura() { //Ligacao api
    var endereco = 'https://api.unsplash.com/photos?per_page=24&page=2&order_by=latest&page='
    var clienteAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578'
    var enderecoPagina = endereco + pagina + clienteAPI;

    $.ajax({
        url: enderecoPagina,
        type: "get",
        async: true,
        success: function (data, status, response) {
            addImagens(data);
        }
    });
}


function addImagens(data) { //Buscar todos os dados a api
  $('#contentorImagens').empty();

  var arrayDeImagens = data;

  for (var i=0; i<arrayDeImagens.length; i++) {
    var imagem = arrayDeImagens[i];
    criarImagem(imagem);
  }
}


function criarImagem(imagem) {      //Criar Imagem
    
    //criar icon
    var i = document.createElement("a");
    i.className = "fa fa-download color right";
    var link = imagem.urls.regular;
    var tab = "_blank" ; 
    i.setAttribute("target", tab);
    i.setAttribute("href", link);
    
    //criar buttao download
    var btn = document.createElement("button");
    btn.className = "btn btn-light";
    btn.appendChild(i);
    
    // criar h5
    var h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerText = imagem.user.name;
    
    
    // criar h6
    var h6 = document.createElement("h6");
    h6.className = "card-title";
    h6.innerText = imagem.description;

    // criar div filha
    var div = document.createElement("div");
    div.className = "card-body ";
    div.appendChild(h5);
    div.appendChild(h6);

    
    // criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc =  imagem.urls.raw + "&fit=crop&w=500&h=500";
    img.setAttribute("src", imgSrc);
  
    // criar div pai
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "card col-lg-3 col-md-4 col-sm-5 nopadding ";  // Small - col-sm-5 | Medium - col-md-4 | Large - col-lg-3
    divPrincipal.appendChild(img);
    divPrincipal.appendChild(div);
    divPrincipal.appendChild(btn);
  
    // adicionar div pai à pagina/DOM
    var container = document.getElementById("contentorImagens");
    container.appendChild(divPrincipal);
  }

//Search

function search() { 
    var inputText = document.getElementById("inputtext");
    var endereco = 'https://api.unsplash.com/search/photos?query=' ;
    var clienteapi = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578';
    var url = endereco + inputText + clienteapi; 
        $.ajax({
        url : url,
        type : "GET",
        async : true,
        success: function (data, status, response) {
            addImagens(data);
        }
        })
    
}

// $('#contentorImagens').empty();


//Button anterior
function anterior() {
    if (pagina == 1)
        alert("Está na pagina inicial");
    else {
        pagina = pagina - 1;
        procura();
    }
}

//Button seguinte
function seguinte() {
    pagina = pagina + 1;
    procura();
}

function programarBotaoSearch() {
    $('#searchbutton').on("click", search);
}

function programarCarregamentoPagina() { 
    $(window).on("load", procura);
}

function programarBotoesPaginacao() {
    var botaoAnterior = document.getElementById("anterior");
    var botaoSeguinte = document.getElementById("seguinte");

    botaoAnterior.addEventListener("click", anterior);
    botaoSeguinte.addEventListener("click", seguinte);
}

programarCarregamentoPagina();
programarBotaoSearch();
programarBotoesPaginacao();
