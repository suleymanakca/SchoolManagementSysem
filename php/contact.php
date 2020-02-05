<?php 

    require_once ("../config.php");

    //$komut = $_POST['komut'];

    //switch($komut) {
      //  case "INS":
            $adi = $_POST['adi']; 
            $dekan_id = $_POST['dekan_id'];

        $sql = "INSERT INTO fakulte(adi, dekan_id) VALUES ('.$adi.', '.$dekan_id.')";
        if(mysqli_query($link, $sql)){
            echo "eklendi";
        }
    //}

    /*$result = mysqli_query($link, "SELECT id, adi, dekan_id FROM fakulte");

    $rows = array();

    while($row = mysqli_fetch_array($result))
    {
        $rows[] = $row;
    }

    echo json_encode($rows);*/
?>