// ================================
// اتصال به Supabase
// ================================

const SUPABASE_URL = "https://ezrvqpnxswpzaygbjeio.supabase.co";
const SUPABASE_KEY = "sb_publishable_Jr0xXzuVDA9QzEFize_dvA_ueYO-246";

const supabaseClient = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_KEY
);


// ================================
// ورود کاربران
// ================================

const loginBtn = document.getElementById("loginBtn");

loginBtn.addEventListener("click", loginUser);

async function loginUser() {

    const username =
    document.getElementById("username").value.trim();

    const password =
    document.getElementById("password").value.trim();

    if(username==="" || password===""){

        document.getElementById("loginResult").innerHTML=
        "نام کاربری و رمز عبور را وارد کنید.";

        return;

    }

    const { data,error } = await supabaseClient

    .from("users")

    .select("*")

    .eq("username",username)

    .eq("password",password)

    .single();

    if(error || !data){

        document.getElementById("loginResult").innerHTML=
        "نام کاربری یا رمز عبور اشتباه است.";

        return;

    }

    localStorage.setItem("username",data.username);

    localStorage.setItem("name",data.name);

    localStorage.setItem("status",data.status);

   document.getElementById("loginResult").innerHTML=
"✅ ورود موفق";


setTimeout(()=>{

    window.location.href="chat.html";

},1000);


}



// ================================
// ارسال پیام
// ================================

const sendBtn = document.getElementById("sendBtn");

if(sendBtn){

    sendBtn.addEventListener("click",sendMessage);

}

async function sendMessage(){

    const username=
    localStorage.getItem("username");

    if(!username){

        alert("ابتدا وارد شوید.");

        return;

    }

    const message=
    document.getElementById("chatText").value.trim();

    if(message==="") return;

    const { error } = await supabaseClient

    .from("messages")

    .insert([{

        username:username,

        message:message

    }]);

    if(error){

        alert("خطا در ارسال پیام");

        console.log(error);

        return;

    }

    document.getElementById("chatText").value="";

    loadMessages();

}



// ================================
// دریافت پیام ها
// ================================

async function loadMessages(){

    const { data,error } = await supabase

    .from("messages")

    .select("*")

    .order("created_at",{ascending:true});

    if(error){

        console.log(error);

        return;

    }

    const box=document.getElementById("messages");

    box.innerHTML="";

    data.forEach(item=>{

        box.innerHTML+=`

        <div class="msg">

        <strong>${item.username}</strong>

        <br>

        ${item.message}

        </div>

        `;

    });

    box.scrollTop=box.scrollHeight;

}

setInterval(loadMessages,2000);

loadMessages();
