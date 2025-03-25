code="ZE27GWabc123";
url="http://gamf.nhely.hu/ajax1/";
async function read() {
  //document.getElementById("crud_table").innerHTML="code="+code;
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  str="";//"<H1>Read</H1>";
  str+="<p class='crud_info'>Rendelések száma: "+data.rowCount+"</p>";
  str+="<p class='crud_info'>Last max "+data.maxNum+" records:</p>";
  str+="<table><tr><th class='table_cim'>id</th><th class='table_cim'>név</th><th class='table_cim'>város</th><th class='table_cim'>telefon</th><th class='table_cim'>kód</th></tr>";
  for(let i=0; i<list.length; i++)
    str += "<tr><td class='crude_sor'>"+list[i].id+"</td><td class='crude_sor'>"+list[i].name+"</td><td class='crude_sor'>"+list[i].city+"</td><td class='crude_sor'>"+list[i].phone+"</td><td class='crude_sor'>"+list[i].code+"</td></tr>";
  str +="</table>";
  document.getElementById("crud_table").innerHTML=str;
}

async function create(){
  // name: reserved word
  nameStr = document.getElementById("curude_c_name").value;
  city = document.getElementById("curude_c_city").value;
  phone = document.getElementById("curude_c_phone").value;
  if(nameStr.length>0 && nameStr.length<=30 && city.length>0 && city.length<=30 && phone.length>0 && phone.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=create&name="+nameStr+"&city="+city+"&phone="+phone
    });
    let data = await response.text(); 
    if(data>0)
        document.getElementById("edit_create").style.borderColor = 'White';
    else
    document.getElementById("edit_create").style.borderColor = 'Red';
    //document.getElementById("createResult").innerHTML=str;
    document.getElementById("curude_c_name").value="";
    document.getElementById("curude_c_city").value="";
    document.getElementById("curude_c_phone").value="";
    read();
  }
  else
    document.getElementById("edit_create").style.borderColor = 'Red';
}

async function getDataForId() {
  let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=read"
  });
  let data = await response.text();
  data = JSON.parse(data);
  let list = data.list;
  for(let i=0; i<list.length; i++)
    if(list[i].id==document.getElementById("crud_u_id").value){
      document.getElementById("crud_u_name").value=list[i].name;
      document.getElementById("crud_u_city").value=list[i].city;
      document.getElementById("crud_u_phone").value=list[i].phone;
    }
}

async function update(){
  // name: reserved word
  id = document.getElementById("crud_u_id").value;
  nameStr = document.getElementById("crud_u_name").value;
  city = document.getElementById("crud_u_city").value;
  phone = document.getElementById("crud_u_phone").value;
  if(id.length>0 && id.length<=30 && nameStr.length>0 && nameStr.length<=30 && city.length>0 && city.length<=30 && phone.length>0 && phone.length<=30 && code.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=update&id="+id+"&name="+nameStr+"&city="+city+"&phone="+phone
    });
    let data = await response.text(); 
    if(data>0)
        document.getElementById("edit_update").style.borderColor='White';
    else
    
    document.getElementById("edit_update").style.borderColor='Red';
    document.getElementById("crud_u_id").value="";
    document.getElementById("crud_u_name").value="";
    document.getElementById("crud_u_city").value="";
    document.getElementById("crud_u_phone").value="";
    read();
  }
  else
    document.getElementById("edit_update").style.borderColor='Red';
}

//delete: resetved word
async function deleteF(){
  id = document.getElementById("crud_d_id").value;
  if(id.length>0 && id.length<=30){
    let response = await fetch(url, {
      method: 'post',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: "code="+code+"&op=delete&id="+id
    });
    let data = await response.text(); 
    if(data>0)
        document.getElementById("edit_delete").style.borderColor="White";
    else
    document.getElementById("edit_delete").style.borderColor="Red";
    
    document.getElementById("crud_d_id").value="";
    read();
  }
  else
    document.getElementById("edit_delete").style.borderColor="Red";
}



window.addEventListener("DOMContentLoaded", function () {
    if (window.location.pathname === "/ajax.html") 
        {
            read();
        }
});