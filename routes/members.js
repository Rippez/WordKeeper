const express = require("express");
const router = express.Router();
const cloudinary = require("cloudinary").v2;
const otpGenerator = require("otp-generator");
const bcrypt = require("bcrypt");

const Member = require("../models/Member");
const Transcation = require("../models/Transaction");
const OTP = require("../models/Otp");

const upload = require("../utils/upload");

const sendMail = require("../services/mailService");

// Handle POST requests to create a new member
router.post("/signup", async (req, res) => {
  try {
    const { username, name, mail, password, mobileNumber } = req.body;

    const memebers = await Member.find();

    for (const member of memebers) {
      if (member.username == username) {
        return res.render("signup.ejs", { error: "Username Already Exists" });
      }

      if (member.mail == mail) {
        return res.render("signup.ejs", { error: "Email Already In Use" });
      }
    }

    const newMember = new Member({ username, name, mail, password, mobileNumber });
    await newMember.save();

    const subject = "Welcome to Word Keeper - Your Account Details";
    const text = `<!doctype html>
    <html ⚡4email data-css-strict>
     <head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script>
      
      <style amp-custom>
    u + .body img ~ div div {
      display:none;
    }
    span.MsoHyperlink, span.MsoHyperlinkFollowed {
      color:inherit;
    }
    a.es-button {
      text-decoration:none;
    }
    .es-desk-hidden {
      display:none;
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
    }
    .es-button-border:hover > a.es-button {
      color:#FFFFFF;
    }
    body {
      width:100%;
      height:100%;
    }
    table {
      border-collapse:collapse;
      border-spacing:0px;
    }
    table td, body, .es-wrapper {
      padding:0;
      Margin:0;
    }
    .es-content, .es-header, .es-footer {
      width:100%;
      table-layout:fixed;
    }
    p, hr {
      Margin:0;
    }
    h1, h2, h3, h4, h5, h6 {
      Margin:0;
      font-family:Oswald, sans-serif;
      letter-spacing:0;
    }
    .es-left {
      float:left;
    }
    .es-right {
      float:right;
    }
    .es-menu td {
      border:0;
    }
    s {
      text-decoration:line-through;
    }
    ul, ol {
      font-family:"Open Sans", sans-serif;
      padding:0px 0px 0px 40px;
      margin:15px 0px;
    }
    ul li {
      color:#262626;
    }
    ol li {
      color:#262626;
    }
    li {
      margin:0px 0px 15px;
      font-size:14px;
    }
    a {
      text-decoration:underline;
    }
    .es-menu td a {
      font-family:"Open Sans", sans-serif;
      text-decoration:none;
      display:block;
    }
    .es-wrapper {
      width:100%;
      height:100%;
    }
    .es-wrapper-color, .es-wrapper {
      background-color:#F5F5F5;
    }
    .es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p {
      font-family:"Open Sans", sans-serif;
      line-height:150%;
      letter-spacing:0;
    }
    .es-header {
      background-color:#1B2A2F;
    }
    .es-header-body {
      background-color:#1B2A2F;
    }
    .es-header-body p {
      color:#BCBDBD;
      font-size:14px;
    }
    .es-header-body a {
      color:#EF0D33;
      font-size:14px;
    }
    .es-footer {
      background-color:#111517;
    }
    .es-footer-body {
      background-color:#111517;
    }
    .es-footer-body p {
      color:#BCBDBD;
      font-size:12px;
    }
    .es-footer-body a {
      color:#EF0D33;
      font-size:12px;
    }
    .es-content-body {
      background-color:#F5F5F5;
    }
    .es-content-body p {
      color:#262626;
      font-size:14px;
    }
    .es-content-body a {
      color:#EF0D33;
      font-size:14px;
    }
    .es-infoblock p {
      font-size:16px;
      color:#FFFFFF;
    }
    .es-infoblock a {
      font-size:16px;
      color:#FFFFFF;
    }
    h1 {
      font-size:28px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#262626;
    }
    h2 {
      font-size:20px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#262626;
    }
    h3 {
      font-size:14px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#888888;
      letter-spacing:0px;
    }
    h4 {
      font-size:24px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    h5 {
      font-size:20px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    h6 {
      font-size:16px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
      font-size:28px;
    }
    .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
      font-size:20px;
    }
    .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
      font-size:14px;
    }
    .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a {
      font-size:24px;
    }
    .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a {
      font-size:20px;
    }
    .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a {
      font-size:16px;
    }
    a.es-button, button.es-button {
      padding:25px 40px 25px 40px;
      display:inline-block;
      background:#1B2A2F;
      border-radius:0px 0px 0px 0px;
      font-size:12px;
      font-family:Oswald, sans-serif;
      font-weight:bold;
      font-style:normal;
      line-height:120%;
      color:#FFFFFF;
      text-decoration:none;
      width:auto;
      text-align:center;
      letter-spacing:0;
    }
    .es-button-border {
      border-style:solid;
      border-color:#1B2A2F #1B2A2F #1B2A2F #1B2A2F;
      background:#1B2A2F;
      border-width:0px 0px 0px 0px;
      display:inline-block;
      border-radius:0px 0px 0px 0px;
      width:auto;
    }
    .es-button img {
      display:inline-block;
      vertical-align:middle;
    }
    .es-fw, .es-fw .es-button {
      display:block;
    }
    .es-il, .es-il .es-button {
      display:inline-block;
    }
    .es-text-rtl h1, .es-text-rtl h2, .es-text-rtl h3, .es-text-rtl h4, .es-text-rtl h5, .es-text-rtl h6, .es-text-rtl input, .es-text-rtl label, .es-text-rtl textarea, .es-text-rtl p, .es-text-rtl ol, .es-text-rtl ul, .es-text-rtl .es-menu a, .es-text-rtl .es-table {
      direction:rtl;
    }
    .es-text-ltr h1, .es-text-ltr h2, .es-text-ltr h3, .es-text-ltr h4, .es-text-ltr h5, .es-text-ltr h6, .es-text-ltr input, .es-text-ltr label, .es-text-ltr textarea, .es-text-ltr p, .es-text-ltr ol, .es-text-ltr ul, .es-text-ltr .es-menu a, .es-text-ltr .es-table {
      direction:ltr;
    }
    .es-text-rtl ol, .es-text-rtl ul {
      padding:0px 40px 0px 0px;
    }
    .es-text-ltr ul, .es-text-ltr ol {
      padding:0px 0px 0px 40px;
    }
    .es-p25t {
      padding-top:25px;
    }
    .es-p40b {
      padding-bottom:40px;
    }
    .es-p20t {
      padding-top:20px;
    }
    .es-p40t {
      padding-top:40px;
    }
    .es-p10r {
      padding-right:10px;
    }
    .es-p10l {
      padding-left:10px;
    }
    .es-p20b {
      padding-bottom:20px;
    }
    .es-p20r {
      padding-right:20px;
    }
    .es-p20l {
      padding-left:20px;
    }
    .es-p-default {
      padding-top:20px;
      padding-right:10px;
      padding-bottom:20px;
      padding-left:10px;
    }
    .es-menu amp-img, .es-button amp-img {
      vertical-align:middle;
    }
    @media only screen and (max-width:600px) {td.es-m-p0r { padding-right:0px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:28px; text-align:left } h2 { font-size:20px; text-align:left } h3 { font-size:14px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:20px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:14px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock a { font-size:14px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:14px; line-height:120% } a.es-button, button.es-button, .es-button-border { display:block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } h1 a { text-align:left } h2 a { text-align:left } h3 a { text-align:left } a.es-button, button.es-button { border-bottom-width:20px; border-top-width:20px } }
    </style>
     </head>
     <body class="body">
      <div dir="ltr" class="es-wrapper-color" lang="en">
       <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f5f5f5"></v:fill>
          </v:background>
        <![endif]-->
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
         <tr>
          <td valign="top">
           <table cellpadding="0" cellspacing="0" class="es-header" align="center">
             <tr>
              <td align="center" bgcolor="#111517" style="background-color: #111517">
               <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#111517" align="center" style="background-color: #111517">
                 <tr>
                  <td class="es-p25t es-p40b" align="left">
                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                      <td class="es-m-p0r" width="600" valign="top" align="center">
                       <table width="100%" cellspacing="0" cellpadding="0">
                         <tr>
                          <td align="center"><p style="font-size: 16px"><strong>Where Books Come to Life!</strong></p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20t es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-content" align="center">
             <tr>
              <td align="center">
               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                  <td class="es-p40t es-p40b es-p10r es-p10l" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td width="580" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                         <tr>
                          <td align="center" class="es-p40b es-m-txt-c"><h1>WELCOME!</h1></td>
                         </tr>
                         <tr>
                          <td align="center"><p style="font-size: 20px">Welcome to Word Keeper! We are excited to have you join our community of book enthusiasts</p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p40t es-p40b es-m-txt-c">
                           <!--[if mso]><a href="http://localhost:8080" target="_blank" hidden>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://localhost:8080" 
                    style="height:64px; v-text-anchor:middle; width:196px" arcsize="0%" stroke="f"  fillcolor="#ef0d33">
        <w:anchorlock></w:anchorlock>
        <center style='color:#ffffff; font-family:Oswald, sans-serif; font-size:12px; font-weight:700; line-height:12px;  mso-text-raise:1px'>VISIT WORD KEEPER</center>
      </v:roundrect></a>
    <![endif]--> 
                           <!--[if !mso]><!-- --><span class="es-button-border msohide" style="background: #ef0d33"><a href="http://localhost:8080" class="es-button" target="_blank" style="background: #ef0d33">VISIT WORD KEEPER</a></span> 
                           <!--<![endif]--></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20b"><p style="font-size: 20px">Here are the details of your account for your convenience and reference.</p></td>
                         </tr>
                         <tr>
                          <td align="left" class="es-p20b"><p style="font-size: 20px"><b style="color: #ff0000">Username : <span style="color:#333333">${username}</span></b></p><p style="font-size: 20px"><b style="color: #ff0000">Name : <span style="color:#333333">${name}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mail : <span style="color:#333333">${mail}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mobile No. : <span style="color:#333333">${mobileNumber}</span></b><br></p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p40b"><p style="font-size: 20px">If you need any assistance, please don't hesitate to reach out to us by visiting Help Us Page.</p></td>
                         </tr>
                         <tr>
                          <td align="left" class="es-p20b"><p style="font-size: 20px"><strong>Cheers, The Word Keeper Team</strong></p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-content" align="center">
             <tr>
              <td class="es-info-area" align="center" bgcolor="#1b2a2f" style="background-color: #1b2a2f">
               <table bgcolor="#1b2a2f" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #1b2a2f">
                 <tr>
                  <td class="es-p20t es-p20b es-p10r es-p10l" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td width="580" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                         <tr>
                          <td align="center" class="es-infoblock es-m-txt-c"><h1 style="color: #ffffff">WORD KEEPER BY JENIL DESAI</h1></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-infoblock es-m-txt-c es-p20t es-p20b"><p>Your digital sanctuary for all things literary, providing access to a diverse range of books and resources. Explore, borrow, and immerse yourself in a world of knowledge with ease and convenience. Welcome to Word Keeper, where reading meets technology for a fulfilling library experience.</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
             <tr>
              <td align="center">
               <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                 <tr>
                  <td class="es-p40t es-p40b es-p20r es-p20l" align="left">
                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                      <td width="560" align="left">
                       <table width="100%" cellspacing="0" cellpadding="0">
                         <tr>
                          <td align="center" class="es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo_ms8.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20t es-m-txt-c" style="font-size:0">
                           <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                             <tr>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png" alt="Fb" title="Facebook" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/x-logo-white.png" alt="X" title="X.com" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png" alt="Yt" title="Youtube" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png" alt="Ig" title="Instagram" width="32" height="32"></amp-img></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </div>
     </body>
    </html>`;

    const recipient = `${mail}`;
    await sendMail(subject, text, recipient);

    res.redirect("/login");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/new", async (req, res) => {
  try {
    const { username, password, name, mail, role, mobileNumber } = req.body;
    const newMember = new Member({ username, password, name, mail, role, mobileNumber });
    await newMember.save();

    const subject = "Welcome to Word Keeper - Your Account Details";
    const text = `<!doctype html>
    <html ⚡4email data-css-strict>
     <head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script>
      
      <style amp-custom>
    u + .body img ~ div div {
      display:none;
    }
    span.MsoHyperlink, span.MsoHyperlinkFollowed {
      color:inherit;
    }
    a.es-button {
      text-decoration:none;
    }
    .es-desk-hidden {
      display:none;
      float:left;
      overflow:hidden;
      width:0;
      max-height:0;
      line-height:0;
    }
    .es-button-border:hover > a.es-button {
      color:#FFFFFF;
    }
    body {
      width:100%;
      height:100%;
    }
    table {
      border-collapse:collapse;
      border-spacing:0px;
    }
    table td, body, .es-wrapper {
      padding:0;
      Margin:0;
    }
    .es-content, .es-header, .es-footer {
      width:100%;
      table-layout:fixed;
    }
    p, hr {
      Margin:0;
    }
    h1, h2, h3, h4, h5, h6 {
      Margin:0;
      font-family:Oswald, sans-serif;
      letter-spacing:0;
    }
    .es-left {
      float:left;
    }
    .es-right {
      float:right;
    }
    .es-menu td {
      border:0;
    }
    s {
      text-decoration:line-through;
    }
    ul, ol {
      font-family:"Open Sans", sans-serif;
      padding:0px 0px 0px 40px;
      margin:15px 0px;
    }
    ul li {
      color:#262626;
    }
    ol li {
      color:#262626;
    }
    li {
      margin:0px 0px 15px;
      font-size:14px;
    }
    a {
      text-decoration:underline;
    }
    .es-menu td a {
      font-family:"Open Sans", sans-serif;
      text-decoration:none;
      display:block;
    }
    .es-wrapper {
      width:100%;
      height:100%;
    }
    .es-wrapper-color, .es-wrapper {
      background-color:#F5F5F5;
    }
    .es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p {
      font-family:"Open Sans", sans-serif;
      line-height:150%;
      letter-spacing:0;
    }
    .es-header {
      background-color:#1B2A2F;
    }
    .es-header-body {
      background-color:#1B2A2F;
    }
    .es-header-body p {
      color:#BCBDBD;
      font-size:14px;
    }
    .es-header-body a {
      color:#EF0D33;
      font-size:14px;
    }
    .es-footer {
      background-color:#111517;
    }
    .es-footer-body {
      background-color:#111517;
    }
    .es-footer-body p {
      color:#BCBDBD;
      font-size:12px;
    }
    .es-footer-body a {
      color:#EF0D33;
      font-size:12px;
    }
    .es-content-body {
      background-color:#F5F5F5;
    }
    .es-content-body p {
      color:#262626;
      font-size:14px;
    }
    .es-content-body a {
      color:#EF0D33;
      font-size:14px;
    }
    .es-infoblock p {
      font-size:16px;
      color:#FFFFFF;
    }
    .es-infoblock a {
      font-size:16px;
      color:#FFFFFF;
    }
    h1 {
      font-size:28px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#262626;
    }
    h2 {
      font-size:20px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#262626;
    }
    h3 {
      font-size:14px;
      font-style:normal;
      font-weight:bold;
      line-height:120%;
      color:#888888;
      letter-spacing:0px;
    }
    h4 {
      font-size:24px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    h5 {
      font-size:20px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    h6 {
      font-size:16px;
      font-style:normal;
      font-weight:normal;
      line-height:120%;
      color:#333333;
    }
    .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
      font-size:28px;
    }
    .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
      font-size:20px;
    }
    .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
      font-size:14px;
    }
    .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a {
      font-size:24px;
    }
    .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a {
      font-size:20px;
    }
    .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a {
      font-size:16px;
    }
    a.es-button, button.es-button {
      padding:25px 40px 25px 40px;
      display:inline-block;
      background:#1B2A2F;
      border-radius:0px 0px 0px 0px;
      font-size:12px;
      font-family:Oswald, sans-serif;
      font-weight:bold;
      font-style:normal;
      line-height:120%;
      color:#FFFFFF;
      text-decoration:none;
      width:auto;
      text-align:center;
      letter-spacing:0;
    }
    .es-button-border {
      border-style:solid;
      border-color:#1B2A2F #1B2A2F #1B2A2F #1B2A2F;
      background:#1B2A2F;
      border-width:0px 0px 0px 0px;
      display:inline-block;
      border-radius:0px 0px 0px 0px;
      width:auto;
    }
    .es-button img {
      display:inline-block;
      vertical-align:middle;
    }
    .es-fw, .es-fw .es-button {
      display:block;
    }
    .es-il, .es-il .es-button {
      display:inline-block;
    }
    .es-text-rtl h1, .es-text-rtl h2, .es-text-rtl h3, .es-text-rtl h4, .es-text-rtl h5, .es-text-rtl h6, .es-text-rtl input, .es-text-rtl label, .es-text-rtl textarea, .es-text-rtl p, .es-text-rtl ol, .es-text-rtl ul, .es-text-rtl .es-menu a, .es-text-rtl .es-table {
      direction:rtl;
    }
    .es-text-ltr h1, .es-text-ltr h2, .es-text-ltr h3, .es-text-ltr h4, .es-text-ltr h5, .es-text-ltr h6, .es-text-ltr input, .es-text-ltr label, .es-text-ltr textarea, .es-text-ltr p, .es-text-ltr ol, .es-text-ltr ul, .es-text-ltr .es-menu a, .es-text-ltr .es-table {
      direction:ltr;
    }
    .es-text-rtl ol, .es-text-rtl ul {
      padding:0px 40px 0px 0px;
    }
    .es-text-ltr ul, .es-text-ltr ol {
      padding:0px 0px 0px 40px;
    }
    .es-p25t {
      padding-top:25px;
    }
    .es-p40b {
      padding-bottom:40px;
    }
    .es-p20t {
      padding-top:20px;
    }
    .es-p40t {
      padding-top:40px;
    }
    .es-p10r {
      padding-right:10px;
    }
    .es-p10l {
      padding-left:10px;
    }
    .es-p20b {
      padding-bottom:20px;
    }
    .es-p20r {
      padding-right:20px;
    }
    .es-p20l {
      padding-left:20px;
    }
    .es-p-default {
      padding-top:20px;
      padding-right:10px;
      padding-bottom:20px;
      padding-left:10px;
    }
    .es-menu amp-img, .es-button amp-img {
      vertical-align:middle;
    }
    @media only screen and (max-width:600px) {td.es-m-p0r { padding-right:0px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:28px; text-align:left } h2 { font-size:20px; text-align:left } h3 { font-size:14px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:20px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:14px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock a { font-size:14px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:14px; line-height:120% } a.es-button, button.es-button, .es-button-border { display:block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } h1 a { text-align:left } h2 a { text-align:left } h3 a { text-align:left } a.es-button, button.es-button { border-bottom-width:20px; border-top-width:20px } }
    </style>
     </head>
     <body class="body">
      <div dir="ltr" class="es-wrapper-color" lang="en">
       <!--[if gte mso 9]>
          <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
            <v:fill type="tile" color="#f5f5f5"></v:fill>
          </v:background>
        <![endif]-->
       <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
         <tr>
          <td valign="top">
           <table cellpadding="0" cellspacing="0" class="es-header" align="center">
             <tr>
              <td align="center" bgcolor="#111517" style="background-color: #111517">
               <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#111517" align="center" style="background-color: #111517">
                 <tr>
                  <td class="es-p25t es-p40b" align="left">
                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                      <td class="es-m-p0r" width="600" valign="top" align="center">
                       <table width="100%" cellspacing="0" cellpadding="0">
                         <tr>
                          <td align="center"><p style="font-size: 16px"><strong>Where Books Come to Life!</strong></p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20t es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-content" align="center">
             <tr>
              <td align="center">
               <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                 <tr>
                  <td class="es-p40t es-p40b es-p10r es-p10l" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td width="580" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                         <tr>
                          <td align="center" class="es-p40b es-m-txt-c"><h1>WELCOME!</h1></td>
                         </tr>
                         <tr>
                          <td align="center"><p style="font-size: 20px">Welcome to Word Keeper! We are excited to have you join our community of book enthusiasts</p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p40t es-p40b es-m-txt-c">
                           <!--[if mso]><a href="http://localhost:8080" target="_blank" hidden>
      <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://localhost:8080" 
                    style="height:64px; v-text-anchor:middle; width:196px" arcsize="0%" stroke="f"  fillcolor="#ef0d33">
        <w:anchorlock></w:anchorlock>
        <center style='color:#ffffff; font-family:Oswald, sans-serif; font-size:12px; font-weight:700; line-height:12px;  mso-text-raise:1px'>VISIT WORD KEEPER</center>
      </v:roundrect></a>
    <![endif]--> 
                           <!--[if !mso]><!-- --><span class="es-button-border msohide" style="background: #ef0d33"><a href="http://localhost:8080" class="es-button" target="_blank" style="background: #ef0d33">VISIT WORD KEEPER</a></span> 
                           <!--<![endif]--></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20b"><p style="font-size: 20px">Here are the details of your account for your convenience and reference.</p></td>
                         </tr>
                         <tr>
                          <td align="left" class="es-p20b"><p style="font-size: 20px"><b style="color: #ff0000">Username : <span style="color:#333333">${username}</span></b></p><p style="font-size: 20px"><b style="color: #ff0000">Name : <span style="color:#333333">${name}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mail : <span style="color:#333333">${mail}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mobile No. : <span style="color:#333333">${mobileNumber}</span></b><br></p></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p40b"><p style="font-size: 20px">If you need any assistance, please don't hesitate to reach out to us by visiting Help Us Page.</p></td>
                         </tr>
                         <tr>
                          <td align="left" class="es-p20b"><p style="font-size: 20px"><strong>Cheers, The Word Keeper Team</strong></p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-content" align="center">
             <tr>
              <td class="es-info-area" align="center" bgcolor="#1b2a2f" style="background-color: #1b2a2f">
               <table bgcolor="#1b2a2f" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #1b2a2f">
                 <tr>
                  <td class="es-p20t es-p20b es-p10r es-p10l" align="left">
                   <table cellpadding="0" cellspacing="0" width="100%">
                     <tr>
                      <td width="580" align="center" valign="top">
                       <table cellpadding="0" cellspacing="0" width="100%">
                         <tr>
                          <td align="center" class="es-infoblock es-m-txt-c"><h1 style="color: #ffffff">WORD KEEPER BY JENIL DESAI</h1></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-infoblock es-m-txt-c es-p20t es-p20b"><p>Your digital sanctuary for all things literary, providing access to a diverse range of books and resources. Explore, borrow, and immerse yourself in a world of knowledge with ease and convenience. Welcome to Word Keeper, where reading meets technology for a fulfilling library experience.</p></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table>
           <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
             <tr>
              <td align="center">
               <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                 <tr>
                  <td class="es-p40t es-p40b es-p20r es-p20l" align="left">
                   <table cellspacing="0" cellpadding="0" width="100%">
                     <tr>
                      <td width="560" align="left">
                       <table width="100%" cellspacing="0" cellpadding="0">
                         <tr>
                          <td align="center" class="es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo_ms8.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                         </tr>
                         <tr>
                          <td align="center" class="es-p20t es-m-txt-c" style="font-size:0">
                           <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                             <tr>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png" alt="Fb" title="Facebook" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/x-logo-white.png" alt="X" title="X.com" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png" alt="Yt" title="Youtube" width="32" height="32"></amp-img></td>
                              <td align="center" valign="top"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png" alt="Ig" title="Instagram" width="32" height="32"></amp-img></td>
                             </tr>
                           </table></td>
                         </tr>
                       </table></td>
                     </tr>
                   </table></td>
                 </tr>
               </table></td>
             </tr>
           </table></td>
         </tr>
       </table>
      </div>
     </body>
    </html>`;

    const recipient = `${mail}`;
    await sendMail(subject, text, recipient);

    res.redirect("/dashboard/members");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the member by username
    const member = await Member.findOne({ username });

    // Check if the member exists and the provided password is correct
    if (member && (await member.comparePassword(password))) {
      req.session.memberId = member._id;
      req.session.username = member.username;
      req.session.role = member.role;

      if (member.role === "admin") {
        return res.redirect(`/dashboard?username=${username}`);
      } else {
        return res.redirect(`/dashboard/user?username=${username}`);
      }
    } else {
      return res.render("./other/login.ejs", { error: "Invalid username or password" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await Member.findByIdAndDelete(id);
    res.redirect("/dashboard/members");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const foundBook = await Member.findById(id);
    res.json(foundBook);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.patch("/", upload.single("profilePicture"), async (req, res) => {
  try {
    const referer = req.headers.referer;
    const { username, name, mail, id, mobileNumber, role } = req.body;

    const updatedFields = {
      username,
      name,
      mail,
      mobileNumber,
      role,
    };
    const queryCondition = { _id: id };

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      updatedFields.profilePicture = result.secure_url;
    }

    if (referer == "http://localhost:8080/dashboard/Members") {
      const memberDetails = await Member.findById(id);
      if (memberDetails.username != username) {
        await Transcation.updateMany({ memberUsername: memberDetails.username }, { $set: { memberUsername: username } });
      }
    } else {
      if (username != req.session.username) {
        await Transcation.updateMany({ memberUsername: req.session.username }, { $set: { memberUsername: username } });
        req.session.username = username;
      }
    }

    const result = await Member.findByIdAndUpdate(queryCondition, updatedFields, { new: true, runValidators: true });

    if (result.preferences.detailsChangedNotification === true) {
      const subject = "Profile Details Updated Successfully";
      const text = `<!doctype html>
      <html ⚡4email data-css-strict>
       <head><meta charset="utf-8"><style amp4email-boilerplate>body{visibility:hidden}</style><script async src="https://cdn.ampproject.org/v0.js"></script>
        
        <style amp-custom>
      u + .body img ~ div div {
        display:none;
      }
      span.MsoHyperlink, span.MsoHyperlinkFollowed {
        color:inherit;
      }
      a.es-button {
        text-decoration:none;
      }
      .es-desk-hidden {
        display:none;
        float:left;
        overflow:hidden;
        width:0;
        max-height:0;
        line-height:0;
      }
      .es-button-border:hover > a.es-button {
        color:#FFFFFF;
      }
      body {
        width:100%;
        height:100%;
      }
      table {
        border-collapse:collapse;
        border-spacing:0px;
      }
      table td, body, .es-wrapper {
        padding:0;
        Margin:0;
      }
      .es-content, .es-header, .es-footer {
        width:100%;
        table-layout:fixed;
      }
      p, hr {
        Margin:0;
      }
      h1, h2, h3, h4, h5, h6 {
        Margin:0;
        font-family:Oswald, sans-serif;
        letter-spacing:0;
      }
      .es-left {
        float:left;
      }
      .es-right {
        float:right;
      }
      .es-menu td {
        border:0;
      }
      s {
        text-decoration:line-through;
      }
      ul, ol {
        font-family:"Open Sans", sans-serif;
        padding:0px 0px 0px 40px;
        margin:15px 0px;
      }
      ul li {
        color:#262626;
      }
      ol li {
        color:#262626;
      }
      li {
        margin:0px 0px 15px;
        font-size:14px;
      }
      a {
        text-decoration:underline;
      }
      .es-menu td a {
        font-family:"Open Sans", sans-serif;
        text-decoration:none;
        display:block;
      }
      .es-wrapper {
        width:100%;
        height:100%;
      }
      .es-wrapper-color, .es-wrapper {
        background-color:#F5F5F5;
      }
      .es-content-body p, .es-footer-body p, .es-header-body p, .es-infoblock p {
        font-family:"Open Sans", sans-serif;
        line-height:150%;
        letter-spacing:0;
      }
      .es-header {
        background-color:#1B2A2F;
      }
      .es-header-body {
        background-color:#1B2A2F;
      }
      .es-header-body p {
        color:#BCBDBD;
        font-size:14px;
      }
      .es-header-body a {
        color:#EF0D33;
        font-size:14px;
      }
      .es-footer {
        background-color:#111517;
      }
      .es-footer-body {
        background-color:#111517;
      }
      .es-footer-body p {
        color:#BCBDBD;
        font-size:12px;
      }
      .es-footer-body a {
        color:#EF0D33;
        font-size:12px;
      }
      .es-content-body {
        background-color:#F5F5F5;
      }
      .es-content-body p {
        color:#262626;
        font-size:14px;
      }
      .es-content-body a {
        color:#EF0D33;
        font-size:14px;
      }
      .es-infoblock p {
        font-size:16px;
        color:#FFFFFF;
      }
      .es-infoblock a {
        font-size:16px;
        color:#FFFFFF;
      }
      h1 {
        font-size:28px;
        font-style:normal;
        font-weight:bold;
        line-height:120%;
        color:#262626;
      }
      h2 {
        font-size:20px;
        font-style:normal;
        font-weight:bold;
        line-height:120%;
        color:#262626;
      }
      h3 {
        font-size:14px;
        font-style:normal;
        font-weight:bold;
        line-height:120%;
        color:#888888;
        letter-spacing:0px;
      }
      h4 {
        font-size:24px;
        font-style:normal;
        font-weight:normal;
        line-height:120%;
        color:#333333;
      }
      h5 {
        font-size:20px;
        font-style:normal;
        font-weight:normal;
        line-height:120%;
        color:#333333;
      }
      h6 {
        font-size:16px;
        font-style:normal;
        font-weight:normal;
        line-height:120%;
        color:#333333;
      }
      .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a {
        font-size:28px;
      }
      .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a {
        font-size:20px;
      }
      .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a {
        font-size:14px;
      }
      .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a {
        font-size:24px;
      }
      .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a {
        font-size:20px;
      }
      .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a {
        font-size:16px;
      }
      a.es-button, button.es-button {
        padding:25px 40px 25px 40px;
        display:inline-block;
        background:#1B2A2F;
        border-radius:0px 0px 0px 0px;
        font-size:12px;
        font-family:Oswald, sans-serif;
        font-weight:bold;
        font-style:normal;
        line-height:120%;
        color:#FFFFFF;
        text-decoration:none;
        width:auto;
        text-align:center;
        letter-spacing:0;
      }
      .es-button-border {
        border-style:solid;
        border-color:#1B2A2F #1B2A2F #1B2A2F #1B2A2F;
        background:#1B2A2F;
        border-width:0px 0px 0px 0px;
        display:inline-block;
        border-radius:0px 0px 0px 0px;
        width:auto;
      }
      .es-button img {
        display:inline-block;
        vertical-align:middle;
      }
      .es-fw, .es-fw .es-button {
        display:block;
      }
      .es-il, .es-il .es-button {
        display:inline-block;
      }
      .es-text-rtl h1, .es-text-rtl h2, .es-text-rtl h3, .es-text-rtl h4, .es-text-rtl h5, .es-text-rtl h6, .es-text-rtl input, .es-text-rtl label, .es-text-rtl textarea, .es-text-rtl p, .es-text-rtl ol, .es-text-rtl ul, .es-text-rtl .es-menu a, .es-text-rtl .es-table {
        direction:rtl;
      }
      .es-text-ltr h1, .es-text-ltr h2, .es-text-ltr h3, .es-text-ltr h4, .es-text-ltr h5, .es-text-ltr h6, .es-text-ltr input, .es-text-ltr label, .es-text-ltr textarea, .es-text-ltr p, .es-text-ltr ol, .es-text-ltr ul, .es-text-ltr .es-menu a, .es-text-ltr .es-table {
        direction:ltr;
      }
      .es-text-rtl ol, .es-text-rtl ul {
        padding:0px 40px 0px 0px;
      }
      .es-text-ltr ul, .es-text-ltr ol {
        padding:0px 0px 0px 40px;
      }
      .es-p25t {
        padding-top:25px;
      }
      .es-p40b {
        padding-bottom:40px;
      }
      .es-p20t {
        padding-top:20px;
      }
      .es-p40t {
        padding-top:40px;
      }
      .es-p10r {
        padding-right:10px;
      }
      .es-p10l {
        padding-left:10px;
      }
      .es-p20b {
        padding-bottom:20px;
      }
      .es-p20r {
        padding-right:20px;
      }
      .es-p20l {
        padding-left:20px;
      }
      .es-p-default {
        padding-top:20px;
        padding-right:10px;
        padding-bottom:20px;
        padding-left:10px;
      }
      .es-menu amp-img, .es-button amp-img {
        vertical-align:middle;
      }
      @media only screen and (max-width:600px) {td.es-m-p0r { padding-right:0px } *[class="gmail-fix"] { display:none } p, a { line-height:150% } h1, h1 a { line-height:120% } h2, h2 a { line-height:120% } h3, h3 a { line-height:120% } h4, h4 a { line-height:120% } h5, h5 a { line-height:120% } h6, h6 a { line-height:120% } h1 { font-size:28px; text-align:left } h2 { font-size:20px; text-align:left } h3 { font-size:14px; text-align:left } h4 { font-size:24px; text-align:left } h5 { font-size:20px; text-align:left } h6 { font-size:16px; text-align:left } .es-header-body h1 a, .es-content-body h1 a, .es-footer-body h1 a { font-size:28px } .es-header-body h2 a, .es-content-body h2 a, .es-footer-body h2 a { font-size:20px } .es-header-body h3 a, .es-content-body h3 a, .es-footer-body h3 a { font-size:14px } .es-header-body h4 a, .es-content-body h4 a, .es-footer-body h4 a { font-size:24px } .es-header-body h5 a, .es-content-body h5 a, .es-footer-body h5 a { font-size:20px } .es-header-body h6 a, .es-content-body h6 a, .es-footer-body h6 a { font-size:16px } .es-menu td a { font-size:14px } .es-header-body p, .es-header-body a { font-size:14px } .es-content-body p, .es-content-body a { font-size:14px } .es-footer-body p, .es-footer-body a { font-size:14px } .es-infoblock p, .es-infoblock a { font-size:14px } .es-m-txt-c, .es-m-txt-c h1, .es-m-txt-c h2, .es-m-txt-c h3, .es-m-txt-c h4, .es-m-txt-c h5, .es-m-txt-c h6 { text-align:center } .es-m-txt-r, .es-m-txt-r h1, .es-m-txt-r h2, .es-m-txt-r h3, .es-m-txt-r h4, .es-m-txt-r h5, .es-m-txt-r h6 { text-align:right } .es-m-txt-j, .es-m-txt-j h1, .es-m-txt-j h2, .es-m-txt-j h3, .es-m-txt-j h4, .es-m-txt-j h5, .es-m-txt-j h6 { text-align:justify } .es-m-txt-l, .es-m-txt-l h1, .es-m-txt-l h2, .es-m-txt-l h3, .es-m-txt-l h4, .es-m-txt-l h5, .es-m-txt-l h6 { text-align:left } .es-m-txt-r amp-img { float:right } .es-m-txt-c amp-img { margin:0 auto } .es-m-txt-l amp-img { float:left } .es-m-txt-r .rollover:hover .rollover-second, .es-m-txt-c .rollover:hover .rollover-second, .es-m-txt-l .rollover:hover .rollover-second { display:inline } .es-m-txt-r .rollover span, .es-m-txt-c .rollover span, .es-m-txt-l .rollover span { line-height:0; font-size:0 } .es-spacer { display:inline-table } a.es-button, button.es-button { font-size:14px; line-height:120% } a.es-button, button.es-button, .es-button-border { display:block } .es-m-fw, .es-m-fw.es-fw, .es-m-fw .es-button { display:block } .es-m-il, .es-m-il .es-button, .es-social, .es-social td, .es-menu { display:inline-block } .es-adaptive table, .es-left, .es-right { width:100% } .es-content table, .es-header table, .es-footer table, .es-content, .es-footer, .es-header { width:100%; max-width:600px } .adapt-img { width:100%; height:auto } .es-mobile-hidden, .es-hidden { display:none } .es-desk-hidden { width:auto; overflow:visible; float:none; max-height:inherit; line-height:inherit } tr.es-desk-hidden { display:table-row } table.es-desk-hidden { display:table } td.es-desk-menu-hidden { display:table-cell } .es-menu td { width:1% } table.es-table-not-adapt, .esd-block-html table { width:auto } .es-social td { padding-bottom:10px } .h-auto { height:auto } h1 a { text-align:left } h2 a { text-align:left } h3 a { text-align:left } a.es-button, button.es-button { border-bottom-width:20px; border-top-width:20px } }
      </style>
       </head>
       <body class="body">
        <div dir="ltr" class="es-wrapper-color" lang="en">
         <!--[if gte mso 9]>
            <v:background xmlns:v="urn:schemas-microsoft-com:vml" fill="t">
              <v:fill type="tile" color="#f5f5f5"></v:fill>
            </v:background>
          <![endif]-->
         <table class="es-wrapper" width="100%" cellspacing="0" cellpadding="0">
           <tr>
            <td valign="top">
             <table cellpadding="0" cellspacing="0" class="es-header" align="center">
               <tr>
                <td align="center" bgcolor="#111517" style="background-color: #111517">
                 <table class="es-header-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#111517" align="center" style="background-color: #111517">
                   <tr>
                    <td class="es-p25t es-p40b" align="left">
                     <table cellspacing="0" cellpadding="0" width="100%">
                       <tr>
                        <td class="es-m-p0r" width="600" valign="top" align="center">
                         <table width="100%" cellspacing="0" cellpadding="0">
                           <tr>
                            <td align="center"><p style="font-size: 16px"><strong>Where Books Come to Life!</strong></p></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p20t es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center">
               <tr>
                <td align="center">
                 <table bgcolor="#ffffff" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600">
                   <tr>
                    <td class="es-p40t es-p40b es-p10r es-p10l" align="left">
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td width="580" align="center" valign="top">
                         <table cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                            <td align="center" class="es-p40b es-m-txt-c"><h1>USER DETAILS CHANGED</h1></td>
                           </tr>
                           <tr>
                            <td align="center"><p style="font-size: 20px">This is to inform you that your profile details have been successfully updated on our platform. Your account information has been modified as per your request</p></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p40t es-p40b es-m-txt-c">
                             <!--[if mso]><a href="http://localhost:8080" target="_blank" hidden>
        <v:roundrect xmlns:v="urn:schemas-microsoft-com:vml" xmlns:w="urn:schemas-microsoft-com:office:word" esdevVmlButton href="http://localhost:8080" 
                      style="height:64px; v-text-anchor:middle; width:153px" arcsize="0%" stroke="f"  fillcolor="#ef0d33">
          <w:anchorlock></w:anchorlock>
          <center style='color:#ffffff; font-family:Oswald, sans-serif; font-size:12px; font-weight:700; line-height:12px;  mso-text-raise:1px'>VIEW ACCOUNT</center>
        </v:roundrect></a>
      <![endif]--> 
                             <!--[if !mso]><!-- --><span class="es-button-border msohide" style="background: #ef0d33"><a href="http://localhost:8080" class="es-button" target="_blank" style="background: #ef0d33">VIEW ACCOUNT</a></span> 
                             <!--<![endif]--></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p20b"><p style="font-size: 20px">Below are the updated details:</p></td>
                           </tr>
                           <tr>
                            <td align="left" class="es-p20b"><p style="font-size: 20px"><b style="color: #ff0000">Username : <span style="color:#333333">${result.username}</span></b></p><p style="font-size: 20px"><b style="color: #ff0000">Name : <span style="color:#333333">${result.name}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mail : <span style="color:#333333">${result.mail}</span></b><br></p><p style="font-size: 20px"><b style="color: #ff0000">Mobile No. : <span style="color:#333333">${result.mobileNumber}</span></b><br></p></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p40b"><p style="font-size: 20px">If you did not make these changes or if you have any concerns regarding your account, please contact our support team immediately.</p></td>
                           </tr>
                           <tr>
                            <td align="left" class="es-p20b"><p style="font-size: 20px"><strong>Cheers, The Word Keeper Team</strong></p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-content" align="center">
               <tr>
                <td class="es-info-area" align="center" bgcolor="#1b2a2f" style="background-color: #1b2a2f">
                 <table bgcolor="#1b2a2f" class="es-content-body" align="center" cellpadding="0" cellspacing="0" width="600" style="background-color: #1b2a2f">
                   <tr>
                    <td class="es-p20t es-p20b es-p10r es-p10l" align="left">
                     <table cellpadding="0" cellspacing="0" width="100%">
                       <tr>
                        <td width="580" align="center" valign="top">
                         <table cellpadding="0" cellspacing="0" width="100%">
                           <tr>
                            <td align="center" class="es-infoblock es-m-txt-c"><h1 style="color: #ffffff">WORD KEEPER BY JENIL DESAI</h1></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-infoblock es-m-txt-c es-p20t es-p20b"><p>Your digital sanctuary for all things literary, providing access to a diverse range of books and resources. Explore, borrow, and immerse yourself in a world of knowledge with ease and convenience. Welcome to Word Keeper, where reading meets technology for a fulfilling library experience.</p></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table>
             <table cellpadding="0" cellspacing="0" class="es-footer" align="center">
               <tr>
                <td align="center">
                 <table class="es-footer-body" width="600" cellspacing="0" cellpadding="0" bgcolor="#ffffff" align="center">
                   <tr>
                    <td class="es-p40t es-p40b es-p20r es-p20l" align="left">
                     <table cellspacing="0" cellpadding="0" width="100%">
                       <tr>
                        <td width="560" align="left">
                         <table width="100%" cellspacing="0" cellpadding="0">
                           <tr>
                            <td align="center" class="es-m-txt-c" style="font-size: 0px"><a target="_blank" href="https://viewstripo.email/"><amp-img src="https://fipbfzq.stripocdn.email/content/guids/a96fa735-2364-4244-86de-d05418dc4ddf/images/logo_ms8.png" alt="" style="display: block" width="150" height="150"></amp-img></a></td>
                           </tr>
                           <tr>
                            <td align="center" class="es-p20t es-m-txt-c" style="font-size:0">
                             <table cellpadding="0" cellspacing="0" class="es-table-not-adapt es-social">
                               <tr>
                                <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/facebook-logo-white.png" alt="Fb" title="Facebook" width="32" height="32"></amp-img></td>
                                <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/x-logo-white.png" alt="X" title="X.com" width="32" height="32"></amp-img></td>
                                <td align="center" valign="top" class="es-p10r"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/youtube-logo-white.png" alt="Yt" title="Youtube" width="32" height="32"></amp-img></td>
                                <td align="center" valign="top"><amp-img src="https://fipbfzq.stripocdn.email/content/assets/img/social-icons/logo-white/instagram-logo-white.png" alt="Ig" title="Instagram" width="32" height="32"></amp-img></td>
                               </tr>
                             </table></td>
                           </tr>
                         </table></td>
                       </tr>
                     </table></td>
                   </tr>
                 </table></td>
               </tr>
             </table></td>
           </tr>
         </table>
        </div>
       </body>
      </html>`;
      const recipient = `${result.mail}`;
      await sendMail(subject, text, recipient);
    }

    if (referer == "http://localhost:8080/dashboard/Members") {
      res.redirect("/dashboard/members");
    } else {
      res.redirect("/dashboard/profile");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/preferences", async (req, res) => {
  try {
    const { bookIssueNotifications, bookReturnNotifications, newBookLaunches, newsletterSubscriptions, passwordChangedNotification, detailsChangedNotification } = req.body;
    const memberId = req.session.memberId;
    const member = await Member.findById(memberId);

    member.preferences = {
      bookIssueNotifications: bookIssueNotifications === "on",
      bookReturnNotifications: bookReturnNotifications === "on",
      newBookLaunches: newBookLaunches === "on",
      newsletterSubscriptions: newsletterSubscriptions === "on",
      passwordChangedNotification: passwordChangedNotification === "on",
      detailsChangedNotification: detailsChangedNotification === "on",
    };

    member.markModified("preferences");

    await member.save();

    res.redirect(`/dashboard/profile`);
  } catch (error) {
    console.error(error);
    res.send({ error: "Internal Server Error" });
  }
});

router.get("/recover-password", async (req, res) => {
  try {
    res.render("./other/recover_password.ejs");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/recover-password", async (req, res) => {
  try {
    const { email } = req.body;
    const otp = otpGenerator.generate(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false });
    await OTP.create({ email, otp });

    const subject = "OTP for Password Reset";
    const text = `Your OTP for resetting the password is: ${otp}. This OTP is valid for 10 minutes.`;
    const recipient = `${email}`;
    await sendMail(subject, text, recipient);

    res.render("./other/otp.ejs", { error: "" });
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/check-otp", async (req, res) => {
  try {
    const { num1, num2, num3, num4, num5, num6 } = req.body;
    let otp = num1 + num2 + num3 + num4 + num5 + num6;

    const storedOTP = await OTP.findOne({ otp });

    if (storedOTP.otp == otp) {
      email = storedOTP.email;
      res.render("./other/reset_password.ejs", { email });
      await OTP.findOneAndDelete({ otp });
    } else {
      res.render("./other/otp.ejs", { error: "Invalid OTP" });
    }
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { password, email } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await Member.updateOne({ mail: email }, { $set: { password: hashedPassword } });

    const member = await Member.findOne({ mail: email });
    if (member.preferences.passwordChangedNotification === true) {
      const subject = "Password Changed Successfully";
      const text = `Dear ${member.name},
      
      We wanted to inform you that your password has been successfully changed for your account on our platform. Your account is now secured with the new password.
      
      If you did not initiate this password change, please contact us immediately for further assistance. It's important to keep your account secure at all times.
      
      Thank you for choosing us.
      
      Best regards,
      Word Keeper`;
      const recipient = `${member.mail}`;
      await sendMail(subject, text, recipient);
    }

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

router.post("/change-password", async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const memberId = req.session.memberId;
    const member = await Member.findById(memberId);

    if (await member.comparePassword(currentPassword)) {
      const hashedPassword = await bcrypt.hash(newPassword, 10);

      await Member.updateOne({ username: member.username }, { $set: { password: hashedPassword } });

      if (member.preferences.passwordChangedNotification === true) {
        const subject = "Password Changed Successfully";
        const text = `Dear ${member.name},
        
        We wanted to inform you that your password has been successfully changed for your account on our platform. Your account is now secured with the new password.
        
        If you did not initiate this password change, please contact us immediately for further assistance. It's important to keep your account secure at all times.
        
        Thank you for choosing us.
        
        Best regards,
        Word Keeper`;
        const recipient = `${member.mail}`;
        await sendMail(subject, text, recipient);
      }
    }

    res.redirect("/dashboard/profile");
  } catch (error) {
    console.log(error);
    res.send("Internal Server Error");
  }
});

module.exports = router;
