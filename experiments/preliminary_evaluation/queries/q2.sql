SELECT sm.executed_by AS executado_por, s.start_time AS data_execucao,
t.id AS task_id, dt.tag AS transformacao
FROM task t JOIN data_transformation dt ON dt.id = t.dt_id
JOIN ds_system_metadata2 sm ON sm.extrairframes_task_id = t.id
JOIN ds_script_metadata2 s ON s.extrairframes_task_id = t.id
WHERE dt.tag = ’extrairframes’ AND s.start_time LIKE ’2025-05-06T21:11:53%’;