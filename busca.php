<?php

$endereco = str_replace(' ', '+', $_POST['endereco']);
$url = 'http://maps.googleapis.com/maps/api/geocode/json?address='.$endereco.'&sensor=true';

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);

$retorno = curl_exec($ch);

die($retorno);
