SELECT t.id AS task_id, dt.tag AS transformacao, sm.executed_by
AS executado_por, s.script_last_modified
FROM task t JOIN data_transformation dt ON dt.id = t.dt_id
JOIN ds_system_metadata5 sm ON sm.treinamentomodelo_task_id = t.id
JOIN ds_script_metadata5 s ON s.treinamentomodelo_task_id = t.id
WHERE dt.tag = ’treinamentomodelo’;