var pagina = 2;

function procura() { //Ligacao API
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

//Procurar

function search() {
    var inputText = document.getElementById("inputtext");
    var endereco = 'https://api.unsplash.com/search/photos?query=';
    var clienteAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578';
    var url = endereco + inputText.value + clienteAPI;
    if (inputText.value == "") {
        $('#myModal').modal('show')   //Aparecer o modal
        $('#closeModal').click(function () {  //Fechar o modal com o close
            $('#myModal').modal('hide');
        })
        $('#closeModall').click(function () {  //Fechar o modal com o x
            $('#myModal').modal('hide');
        })
    } 
    else {
        $.ajax({
            url: url,
            type: "GET",
            async: true,
            success: function (data, status, response) {
                if (data.results == null) {
                    $('#contentorImagens').empty();
                    Swal.fire(
                        'ERROR!',
                        'Encontra-se na página inicial',
                        'error'
                    )
                }
                else {
                    Imagensprocurar(data);
                }
            },
        });
    }
}


function addImagens(data) { //Buscar todos os dados a API
    $('#contentorImagens').empty();

    var arrayDeImagens = data;
    for (var i = 0; i < arrayDeImagens.length; i++) {
        var imagem = arrayDeImagens[i];
        criarImagem(imagem);
    }
}

function Imagensprocurar(data) { //Buscar os dados consoante o que eu escrevo 
    $('#contentorImagens').empty();

    var arrayDeImagens = data;
    for (var i = 0; i < arrayDeImagens.results.length; i++) {
        var imagem = arrayDeImagens.results[i];
        criarImagem(imagem);
    }
}


//Criar Imagem
function criarImagem(imagem) {      

    //criar icon
    var i = document.createElement("a");
    i.className = "fa fa-download color";
    var link = imagem.urls.regular;
    var tab = "_blank";
    i.setAttribute("target", tab); //Abrir uma nova aba
    i.setAttribute("href", link); //Referencia


    //criar button download
    var btn = document.createElement("button");
    btn.className = "btn btn-light";
    btn.appendChild(i);


    // criar h5
    var h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerText = imagem.user.name;


    // criar h6
    var h6 = document.createElement("h6");
    h6.className = "card-description";
    h6.innerText = imagem.description;


    //criar div button
    var divb = document.createElement("div");
    divb.className = "card-bottom";
    divb.appendChild(btn);


    // criar div filha
    var div = document.createElement("div");
    div.className = "card-body";
    div.appendChild(h5);
    div.appendChild(h6);


    // criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc = imagem.urls.raw + "&fit=crop&w=500&h=500";
    img.setAttribute("src", imgSrc);


    // criar div card
    var divcard = document.createElement("div");
    divcard.className = "card nopadding";  // Small - col-sm-5 | Medium - col-md-4 | Large - col-lg-3
    divcard.appendChild(img);
    divcard.appendChild(div);
    divcard.appendChild(divb);


    //criar div
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "col-lg-3 col-md-4 col-sm-6";  // Small - col-sm-5 | Medium - col-md-4 | Large - col-lg-3
    divPrincipal.appendChild(divcard);


    // adicionar div pai à pagina/DOM
    var container = document.getElementById("contentorImagens");
    container.appendChild(divPrincipal);
}

//Button anterior
function anterior() {
    if (pagina == 1) {
        Swal.fire(
            'ERRO',
            'Encontra-se na página inicial',
            'error'
        )
    }
    else {
        pagina = pagina - 1;
        procura();
    }
}


//Button seguinte
function seguinte(data) {
    var inputText = document.getElementById("inputtext");
    var endereco = 'https://api.unsplash.com/search/photos?query=';
    var clienteAPI = '&client_id=dd4e1cb73ca3a1036d4e98d26f72a439141dc17039e1ae79b7bc2a23f3488578';
    var url = endereco + inputText.value + clienteAPI;
    $.ajax({
        url: url,
        type: "GET",
        async: true,
        success: function (data, status, response) {
            if (pagina >= data.results) { //Numero max paginas (POR FAZER)
                alert("Está na ultima pagina");
            }
            else {
                pagina = pagina + 1;
                procura();
            }
        },
    });
}


//Button Search
function programarButtonSearch() {
    $('#searchbutton').on("click", search);
}


//Load da pagina
function programarCarregamentoPagina() {
    $(window).on("load", procura);
}


//Buttons paginacao
function programarBotoesPaginacao() {
    var botaoAnterior = document.getElementById("anterior");
    var botaoSeguinte = document.getElementById("seguinte");

    botaoAnterior.addEventListener("click", anterior);
    botaoSeguinte.addEventListener("click", seguinte);
}


programarCarregamentoPagina();
programarBotoesPaginacao();
programarButtonSearch(); 
