<?php
    class TimeLine {
        # Ex 2 : Fill out the methods
        private $db;
        function __construct()
        {
            # You can change mysql username or password
            $this->db = new PDO("mysql:host=localhost;dbname=timeline", "root", "root");
            $this->db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        public function add($tweet) // This function inserts a tweet
        {
            //Fill out here
            $total = explode(",",$tweet);
            $author = $total[0];
            $contents = $total[1];
            $time = 'NOW()';
            $stmt = $this->db->prepare("insert into tweets(author,contents,time) values(?,?,NOW())");
            $stmt->execute(array($author,$contents));
        }
        public function delete($no) // This function deletes a tweet
        {
            //Fill out here
           $stmt = $this->db->prepare("delete from tweets where no=?");
           $stmt->execute(array($no));
        }
        # Ex 6: hash tag
        # Find has tag from the contents, add <a> tag using preg_replace() or preg_replace_callback()
        public function loadTweets() // This function load all tweets
        {
            //Fill out here
            $rows = $this->db->query("select * from tweets order by time desc");
            $row_count = $rows->rowCount();
            $rows = $rows->fetchAll(PDO::FETCH_ASSOC);
            for($i=0;$i<$row_count;$i++)
            {
                $contents = $rows[$i]["contents"];
                $url = "index.php";
                $replace = "<a href=\"{$url}?type=contents&query=$1\">#$1</a>";
                $contents = preg_replace("/#([_]*[a-zA-Z0-9]+[\wa-zA-Z0-9]*)/", $replace, $contents);
                $rows[$i]["contents"] = $contents;
            }
            return $rows;
        }
        public function searchTweets($type, $query) // This function load tweets meeting conditions
        {
            //Fill out here

            $query_q = $this->db->quote($query);

            if(!strcmp($type,"author"))
            {
                $query_i = '%'.($query).'%';
                $query_q = $this->db->quote($query_i);
                $rows = $this->db->query("select * from tweets where author like $query_q order by time desc");
            }
            else if(!strcmp($type,"contents"))
            {   $query_i = '%'.($query).'%';
                $query_q = $this->db->quote($query_i);
                print_r($query_q);
                $rows = $this->db->query("select * from tweets where contents like $query_q order by time desc");
            }
            return $rows;
        }
    }
?>
