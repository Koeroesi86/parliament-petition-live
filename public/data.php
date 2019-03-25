<?php

$contents = new stdClass();
$PETITION_ID = "241584";
$response = "";

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');

if (file_exists('./data.json')) {
    $contents = json_decode(file_get_contents('./data.json'));
}

if ($contents->updated < time() - 10) {
    try {
        $response = file_get_contents("https://petition.parliament.uk/petitions/${PETITION_ID}.json");
        $contents->data = json_decode($response);
        $contents->updated = time();
        file_put_contents('./data.json', json_encode($contents));
    } catch (Exception $e) {
        //
    }
}

$etag = md5(json_encode($contents->data));
header("Last-Modified: ".gmdate("D, d M Y H:i:s", strtotime($contents->data->data->attributes->updated_at))." GMT");
header("Etag: $etag");

if (array_key_exists("HTTP_IF_NONE_MATCH", $_SERVER)) {
    if (@strtotime($_SERVER['HTTP_IF_MODIFIED_SINCE']) == strtotime($contents->data->data->attributes->updated_at) || trim($_SERVER['HTTP_IF_NONE_MATCH']) == $etag) {
        header("HTTP/1.1 304 Not Modified");
        exit;
    }
}

echo json_encode($contents->data);

