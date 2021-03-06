window.onload = () =>{
 
    console.log("Client side js"); 

    const form = document.querySelector('form');
    const search = document.querySelector('input');
    const m1 = document.getElementById('p1');
    const m2 = document.getElementById('p2')
    const con = document.getElementById('con');

    form.addEventListener('submit', (e)=>{
        e.preventDefault();
        con.style.visibility = "visible";

        const location = search.value
        p2.textContent = "Loading data..."

        fetch('/weather?address='+location).then((res)=>{
            res.json().then((data)=>{
                p2.textContent = "" 
                if(data.error) return m1.innerText = data.error;
                m1.textContent  = "Forecast : "+data.forecast;
                m2.textContent = "Country : "+ data.country;
            })
        })

    })

}

