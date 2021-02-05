var pagina = 1; //Pagina
var x = 0; //Variavel para paginação correta caso esteja a fazer search de uma imagem


//Ligacao API
function procura() {
    if(x != 0){   //Se clicar no button GO ele vai  retornar o x=1
        search();
    }
    else{  //Vai estar sempre a fazer esta função enquanto eu nao clicar no button go
    var endereco = 'https://api.unsplash.com/photos?per_page=24&page=1&order_by=latest&page='
    var clienteAPI = '&client_id=7gq1AYl7h4F_zZHQvKnRRRFsl--G2xF16WueDwb77zA'
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
}


//Procurar dados na API consoante o que está escrito na SearchBox
function search() {
    var inputText = document.getElementById("inputtext");
    var endereco = 'https://api.unsplash.com/search/photos?query=';
    var page = '&per_page=24page=2&order_by=latest&page='
    var clienteAPI = '&client_id=7gq1AYl7h4F_zZHQvKnRRRFsl--G2xF16WueDwb77zA';
    var url = endereco + inputText.value + page + pagina + clienteAPI;
    if (inputText.value == "") {
        $('#myModal').modal('show')  //Aparecer o modal
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
            success: function (data, status, response) {;
                if (data.total == 0) {  //data.total == 0 quando nao encontra nada na API
                    $('#contentorImagens').empty(); //Contentor de Imagens Vazio
                    $("#page").css("display", "none"); //Retiar os buttons de paginacao
                    $("#notfound").css("display", "inline");  //Por a class notfound visivel
                }
                else {
                    Imagensprocurar(data);     
                }
            },
        });
    }
}


//Buscar todos os dados a API
function addImagens(data) { 
    $('#contentorImagens').empty();

    var arrayDeImagens = data;
    for (var i = 0; i < arrayDeImagens.length; i++) {
        var imagem = arrayDeImagens[i];
        criarImagem(imagem);
    }
}


//Buscar os dados consoante o que esta escrito na searchbox
function Imagensprocurar(data) { 
    $('#contentorImagens').empty();

    var arrayDeImagens = data;
    for (var i = 0; i < arrayDeImagens.results.length; i++) {
        var imagem = arrayDeImagens.results[i];
        criarImagem(imagem);
    }
}


//Criar Imagem
function criarImagem(imagem) {      

    //Criar icon
    var i = document.createElement("a");
    i.className = "fa fa-download color";
    var link = imagem.urls.regular;
    var tab = "_blank";
    i.setAttribute("target", tab); //Abrir uma nova aba
    i.setAttribute("href", link); //Referencia/Link
    i.appendChild(btn);

    //Criar button download
    var btn = document.createElement("button");
    btn.className = "btn btn-light";
   // btn.appendChild(i);


    //Criar h5
    var h5 = document.createElement("h5");
    h5.className = "card-title";
    h5.innerText = imagem.user.name;


    //Criar h6
    var h6 = document.createElement("h6");
    h6.className = "card-description";
    h6.innerText = imagem.description;


    //Criar div button
    var divb = document.createElement("div");
    divb.className = "card-bottom";
    divb.appendChild(i);


    //Criar div filha
    var div = document.createElement("div");
    div.className = "card-body";
    div.appendChild(h5);
    div.appendChild(h6);


    //Criar img
    var img = document.createElement("img");
    img.className = "card-img-top";
    var imgSrc = imagem.urls.raw + "&fit=crop&w=500&h=500"; 
    img.setAttribute("src", imgSrc);


    //Criar div card
    var divcard = document.createElement("div");
    divcard.className = "card nopadding";  //nopadding para a imagem ocupar a card toda
    divcard.appendChild(img);
    divcard.appendChild(div);
    divcard.appendChild(divb);


    //Criar div
    var divPrincipal = document.createElement("div");
    divPrincipal.className = "col-lg-3 col-md-4 col-sm-6";  // Small - col-sm-6 | Medium - col-md-4 | Large - col-lg-3
    divPrincipal.appendChild(divcard);


    //Adicionar div pai à pagina/DOM
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
        procura(); // se clicar no button go o x=1 e vai estar sempre a procurar imagens que eu procurei mesmo que clique na pagina anterior;
    }              // senão o x=0 e vai buscar todas as imagens da API e retrocedendo
}


//Refresh à página
function refreshPage(){
    location.reload();
}


//Button seguinte
function seguinte(data) {
    var endereco = 'https://api.unsplash.com/stats/total?&client_id=7gq1AYl7h4F_zZHQvKnRRRFsl--G2xF16WueDwb77zA';
    $.ajax({
        url: endereco,
        type: "get",
        async: true,
        success: function (data, status, response) {
            var max = data.total_photos/24; //Numero total de fotos a dividir por 24 -> numero de imagens por pagina
            if (pagina == max ) { 
                Swal.fire(
                    'ERRO',
                    'Encontra-se na ultima pagina',
                    'error'
                )
            }
            else {
                pagina = pagina + 1;
                procura(); // se clicar no button go o x=1 e vai estar sempre a procurar imagens que eu procurei mesmo que clique na pagina seguinte;
            }              // senão o x=0 e vai buscar todas as imagens da API e avançado consoante a pagina;
        }
    });
}


//Button Search
$('#searchbutton').on("click", ()=>{   //Funcao anonima //Se clicar no button GO ele vai fazer esta funcao pois vai retornar o x=1
    search(); 
    x=1;
});


//Carregar a pagina com os dados da API
$(window).on("load", procura);


//Button refresh
$('#notfoundb').on("click", refreshPage);


//Buttons paginacao
var botaoAnterior = document.getElementById("anterior");
var botaoSeguinte = document.getElementById("seguinte");

botaoAnterior.addEventListener("click", anterior);
botaoSeguinte.addEventListener("click", seguinte);



