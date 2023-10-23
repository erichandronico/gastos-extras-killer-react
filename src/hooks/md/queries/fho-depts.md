#### Depts FHO => FuelOnet
```sql
SELECT
       d.id,
       d.[name]
       ,f.id [fleet_id],
       f.code as fleet_code
      ,d.[status]
      ,d.[code]
      ,d.[address]
      ,d.[phone]
      ,d.[fax]
      ,d.[email]
      ,d.[contact]
      ,d.[use_pin_code]
      ,d.[auth_pin_from]
      ,d.[nr_pin_retries]
      ,d.[block_if_pin_retries_fail]
      ,d.[opos_prompt_for_plate]
      ,d.[opos_prompt_for_odometer]
      ,d.[do_odo_reasonability_check]
      ,d.[max_odo_delta_allowed]
      ,d.[nr_odo_retries]
      ,d.[price_list_id]
      ,d.[black_white_type]
      ,d.[opos_prompt_for_engine_hours]
      ,d.[address2]
      ,d.[city]
      ,d.[state]
      ,d.[zip]
      ,d.[user_data1]
      ,d.[user_data2]
      ,d.[user_data3]
      ,d.[user_data4]
      ,d.[user_data5]
      ,d.[disable_viu_two_stage]
      ,d.[prompt_always_for_viu]
      ,d.[discovered]
      ,d.[do_eh_reasonability_check]
      ,d.[max_eh_delta_allowed]
      ,d.[nr_eh_retries]
      ,d.[reject_if_eh_check_fails]
      ,d.[reject_if_odm_check_fails]
  FROM [HO_DATA].[dbo].[depts] d
  join [HO_DATA].[dbo].[fleets] f on f.id = d.fleet_id
  where d.status > 0 and f.status > 0
  ```