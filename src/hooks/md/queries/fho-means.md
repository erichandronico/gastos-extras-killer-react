#### Means FHO => FuelOnet Prime
```sql
SELECT 
      m.id
      ,m.[name]
      ,m.[string]
      ,m.[type]
      ,m.[status]
      ,m.[rule]
      ,gr.[name] as rule_name
      ,m.[hardware_type]
      ,m.[pump]
      ,m.[employee_type]
      ,m.[plate]
      ,mo.id [model_id]
      ,mo.name as modelo
      ,m.[YEAR]
      ,m.[capacity]
      ,m.[consumption]
      ,m.[odometer]
      ,m.[cust_id]
      ,m.[address]
      ,f.id [fleet_id]
      ,f.name as fleet_name
      ,d.[id] [dept_id]
      ,d.name as dept_name
      ,m.[acctyp]
      ,m.[available_amount]
      ,CONVERT( varchar(19), m.update_timestamp, 120) as update_timestamp
      ,m.[fcc_bos_cleared]
      ,m.[use_pin_code]
      ,m.[pin_code]
      ,m.[auth_pin_from]
      ,m.[nr_pin_retries]
      ,m.[block_if_pin_retries_fail]
      ,m.[opos_prompt_for_plate]
      ,m.[opos_prompt_for_odometer]
      ,m.[do_odo_reasonability_check]
      ,m.[max_odo_delta_allowed]
      ,m.[nr_odo_retries]
      ,m.[driver_id_type_required]
      ,m.[price_list_id]
      ,m.[auttyp]
      ,m.[engine_hours]
      ,m.[original_engine_hours]
      ,m.[target_engine_hours]
      ,m.[price_list]
      ,m.[opos_prompt_for_engine_hours]
      ,m.[start_odometer]
      ,m.[consumption2]
      ,m.[is_burned]
      ,m.[viu_serial]
      ,m.[allow_id_replacement]
      ,m.[num_of_strings]
      ,m.[string2]
      ,m.[string3]
      ,m.[string4]
      ,m.[string5]
      ,m.[opos_plate_check_type]
      ,m.[nr_plate_retries]
      ,m.[block_if_plate_retries_fail]
      ,CONVERT( varchar(19), m.last_used, 120) as last_used
      ,m.[disable_viu_two_stage]
      ,m.[prompt_always_for_viu]
      ,m.[expire]
      ,m.[expire_date]
      ,m.[do_eh_reasonability_check]
      ,m.[max_eh_delta_allowed]
      ,m.[nr_eh_retries]
      ,m.[reject_if_eh_check_fails]
      ,m.[reject_if_odm_check_fails]
      ,m.[route_prompt]
      ,m.[pressure_level]
      ,m.[attendant_required]
      ,m.[prompt_for_jobcode]
  FROM [HO_DATA].[dbo].[means] m
  join [HO_DATA].[dbo].[fleets] f on  m.fleet_id = f.id and f.status > 0
  join [HO_DATA].[dbo].[depts] d on d.fleet_id = m.fleet_id and d.id = m.dept_id and d.status > 0
  left outer join [HO_DATA].[dbo].[model] mo on mo.id = m.model_id
  left outer join [HO_DATA].[dbo].[group_rules] gr on gr.id = m.[rule]
  where m.status > 0 and type in ( 1, 2, 3, 4 )
  ```

