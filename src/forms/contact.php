<?php
/**
 * Contact Form with Google reCAPTCHA + Gmail SMTP
 * Requires: assets/vendor/php-email-form/php-email-form.php
 * For help: https://bootstrapmade.com/php-email-form/
 */

// Replace with your receiving email
$receiving_email_address = 'shiv.m.arna@gmail.com';

// Load PHP Email Form library
if (file_exists($php_email_form = '../assets/vendor/php-email-form/php-email-form.php')) {
  include($php_email_form);
} else {
  die('Unable to load the "PHP Email Form" Library!');
}

$contact = new PHP_Email_Form;
$contact->ajax = true;

// Recipient & sender details
$contact->to = $receiving_email_address;
$contact->from_name = $_POST['name'] ?? '';
$contact->from_email = $_POST['email'] ?? '';
$contact->subject = $_POST['subject'] ?? 'Website Contact Form';

// ✅ STEP 1: Google reCAPTCHA Verification
$recaptcha_secret = 'YOUR_SECRET_KEY_HERE'; // Replace with your secret key
$recaptcha_response = $_POST['g-recaptcha-response'] ?? '';

if (empty($recaptcha_response)) {
  die('Please complete the reCAPTCHA verification.');
}

$verify = file_get_contents("https://www.google.com/recaptcha/api/siteverify?secret={$recaptcha_secret}&response={$recaptcha_response}");
$response_data = json_decode($verify);

if (!$response_data->success) {
  die('reCAPTCHA verification failed. Please try again.');
}

// ✅ STEP 2: Gmail SMTP Configuration
$contact->smtp = array(
  'host' => 'smtp.gmail.com',
  'username' => 'shiv.sample.junction@gmail.com',   // your Gmail address
  'password' => 'llha dtho mgjt gtzh',  // your Gmail App Password (not normal password)
  'port' => '587'
);

// ✅ STEP 3: Add message content
$contact->add_message($_POST['name'] ?? '', 'From');
$contact->add_message($_POST['email'] ?? '', 'Email');
$contact->add_message($_POST['message'] ?? '', 'Message', 10);

// ✅ STEP 4: Send the email
echo $contact->send();
?>


// site key:- 6LeG3fArAAAAAMd76u_DgoPr8a9yZCdoYusGvcib
// Secret Key :- 6LeG3fArAAAAALAhnrQkwaDzIJcmzcvqBP6izYNZ