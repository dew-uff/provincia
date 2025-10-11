SELECT f.path, v.video_path
FROM ds_framesgerados f, ds_videosentrada v
WHERE f.extrairframes_task_id = v.extrairframes_task_id
AND f.path = ’/frames/089/frame2.jpg’;