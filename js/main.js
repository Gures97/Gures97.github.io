function onClick(element){
    document.getElementById("img01").src = element.src;
    document.getElementById("modal01").style.display = "block";
    let captionText = document.getElementById("caption");
    captionText.innerHTML = element.alt;
}

function w3_open(){
    let mySidebar = document.getElementById("mySidebar");
    if(mySidebar.style.display === 'block'){
        mySidebar.style.display = 'none';
    } else{
        mySidebar.style.display = 'block';
    }
}

function w3_close(){
    let mySidebar = document.getElementById("mySidebar");
    mySidebar.style.display = 'none';
}