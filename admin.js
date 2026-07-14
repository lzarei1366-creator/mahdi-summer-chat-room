// ==========================
// اتصال به Supabase
// ==========================

const SUPABASE_URL = "https://ezrvqpnxswpzaygbjeio.supabase.co"
const SUPABASE_KEY = "sb_publishable_Jr0xXzuVDA9QzEFize_dvA_ueYO-246";

const supabase = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ==========================
// ورود مدیر
// ==========================

document.getElementById("adminLogin").addEventListener("click", loginAdmin);

async function loginAdmin(){

    const username =
    document.getElementById("adminUser").value.trim();

    const password =
    document.getElementById("adminPass").value.trim();

    const { data,error } = await supabase

    .from("users")

    .select("*")

    .eq("username",username)

    .eq("password",password)

    .single();

    if(error || !data){

        document.getElementById("adminResult").innerHTML =
        "❌ نام کاربری یا رمز اشتباه است";

        return;

    }

    if(data.status !== "admin"){

        document.getElementById("adminResult").innerHTML =
        "❌ دسترسی ندارید";

        return;

    }

    document.getElementById("adminPanel").style.display = "block";

    document.getElementById("adminResult").innerHTML =
    "✅ ورود موفق";

    loadAllMessages();

}



// ==========================
// نمایش پیام ها
// ==========================

async function loadAllMessages(){

    const { data,error } = await supabase

    .from("messages")

    .select("*")

    .order("created_at",{ascending:true});

    if(error){

        console.log(error);

        return;

    }

    const box =
    document.getElementById("allMessages");

    box.innerHTML = "";

    data.forEach(item=>{

        box.innerHTML += `

<div class="msg">

<b>${item.username}</b>

<br>

${item.message}

<br><br>

<button onclick="deleteMessage(${item.id})">

حذف پیام

</button>

</div>

`;

    });

}



// ==========================
// حذف پیام
// ==========================

async function deleteMessage(id){

    await supabase

    .from("messages")

    .delete()

    .eq("id",id);

    loadAllMessages();

}



// ==========================
// ثبت اطلاعیه
// ==========================

document.getElementById("saveNotice").addEventListener("click",async()=>{

    const notice =
    document.getElementById("notice").value.trim();

    if(notice==="") return;

    await supabase

    .from("notices")

    .insert([{

        text:notice

    }]);

    alert("اطلاعیه ثبت شد");

    document.getElementById("notice").value="";

});
