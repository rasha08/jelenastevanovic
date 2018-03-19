<?php
    $to = "stevanovich.jelena@gmail.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $fb = $_POST['fb'];
    $subject = $_POST['application'] ? "Prijava za treninge" : "Poruka sa Sajta";
    $subject2 = $_POST['application'] ? "Prijava za treninge" : "Kopija Vaše Poruke";
    $message = " Ime i prezime:  " . $first_name . " " . $last_name . " " . " " ." fb link:    " . $fb . " " . "\n\n" . $_POST['message'];
    $message2 = $_POST['application'] ?
        "Draga " . $first_name . "\n\n" . "Hvala sto ste se prijavili, ja cu se potruditi da Vam se sto pre javim!" :
        "Kopija Vaše Poruke " . $first_name . "\n\n" . $_POST['message'];

    $headers = "From:" . $from;
    $headers2 = "From:" . $to;
    mail($to,$subject,$message,$headers);
    mail($from,$subject2,$message2,$headers2); // sends a copy of the message to the sender
   
    if ($_POST['application']) {
        header('Location: http://jelenastevanovic.rs/personalni-treninzi-za-zene');
    } else {
        header('Location: http://jelenastevanovic.rs/kontakt');
    }
?>
