SELECT DISTINCT ve.video_path
FROM   ds_imagens_treinamento AS it
JOIN   ds_framesgerados       AS fr
       ON fr.path LIKE '%' || regexp_replace(it.caminho_imagem, '.*/', '')
JOIN   ds_videosentrada       AS ve
       ON ve.extrairframes_task_id = fr.extrairframes_task_id
WHERE  it.treinamentomodelov1_task_id = 1647;
