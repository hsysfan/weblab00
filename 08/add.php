<?php
    try
    {
        require_once("timeline.php");
        if(preg_match("/^[a-zA-Z]+(?:[\s-][a-zA-Z]+)*$/",$_POST["author"]))
        {
            $timeline = new TimeLine();
            $author = $_POST["author"];
            $contents = htmlspecialchars($_POST["contents"]);
            $tweets=$author.",".$contents;
            $timeline->add($tweets);
            header("Location:index.php");
        } 
        else 
        {
            header("Loaction:error.php");
        }
    } 
    catch(Exception $e)
    {
        header("Loaction:error.php");
    }
?>
