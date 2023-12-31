 #### Refuels desde FHO

  ```sql

  SELECT TOP (1000) 
    t.[shift_id]
    ,CONVERT(VARCHAR(19), t.[timestamp], 120) [timestamp]
    ,t.[id]
    ,CONVERT(VARCHAR(19), t.[date], 120) [date]
    ,CONVERT(VARCHAR(19), t.[time], 120) [time]
    ,t.[type]
    ,t.[pump]
    ,t.[nozzle]
    ,t.[product_code]
    ,t.[sale]
    ,t.[ppv]
    ,t.[quantity]
    ,t.[density]
    ,t.[temperature]
    ,t.[tag]
    ,t.[tank_id]
    ,t.[track1]
    ,t.[track2]
    ,t.[odometer]
    ,t.[engine_hours]
    ,t.[fleet_id]
    ,f.[name] [fleet_name]
    ,f.[code] [fleet_code]
    ,t.[mean_id]
    ,m.[name] [mean_name]
    ,t.[plate]
    ,CASE
    WHEN m.type = 1 THEN 'ATD'
    WHEN m.type = 2 then 'TAG'
    WHEN m.type = 3 THEN 'VIS'
    WHEN m.type = 4 THEN 'DRV'
    WHEN m.type is NULL THEN '-' END AS [mean_type]
    ,t.[coupon_id]
    ,t.[external_tran_id]
    ,t.[external_auth_number]
    ,t.[trx_seq_no]
    ,t.[fcc_bos_cleared]
    ,t.[tank_name]
    ,t.[mean_name]
    ,d.[code] [dept_code]
    ,d.[name] [dept_name]
    ,t.[product_name]
    ,t.[pump_id]
    ,t.[nozzle_id]
    ,t.[driver_object_id]
    ,t.[driver_name]
    ,t.[stn_id]
    ,t.[txn_calc_status]
    ,t.[sent_to_dho]
    ,t.[sent_to_fho]
    ,t.[counter2]
    ,t.[counter3]
    ,t.[timer2]
    ,t.[timer3]
    ,t.[previous_odometer]
    ,t.[previous_engine_hours]
    ,t.[hose_number]
    ,t.[cash_customer_id]
    ,t.[total_price_after_discount]
    ,t.[receipt_id]
    ,t.[entry_type]
    ,t.[changed_trans_flag]
    ,t.[billing_sale]
    ,t.[pir_payment_type]
    ,t.[pir_trans_date_time]
    ,t.[pir_refuel_method]
    ,CONVERT(VARCHAR(19), t.[start_flow], 120) [start_flow]
    ,CONVERT(VARCHAR(19), t.[end_flow], 120) [end_flow]
    ,t.[night_shift]
    ,t.[pir_additional_plate]
    ,t.[pir_additional_tag]
    ,t.[pir_additional_type]
    ,t.[proxy_id]
    ,t.[base_price]
    ,t.[price_list_id]
    ,t.[base_product_percent]
    ,t.[aux1_eh]
    ,t.[aux2_eh]
    ,t.[totalizer_vol]
    ,t.[preset_volume]
    ,t.[preset_money]
    ,t.[last_running_volume]
    ,t.[refund]
    ,t.[authorization_mode]
    ,t.[sent_to_client]
    ,t.[auth_type]
    ,t.[aa_mods]
    ,t.[coupon_num]
    ,t.[authorized_user_id]
    ,t.[totalizer_original]
    ,t.[truckstop_invoice_num]
    ,t.[tail_id]
    ,t.[pressure_level]
    ,t.[totalizer_money]
    ,t.[attendant_object_id]
    ,t.[attendant_name]
    ,t.[device_id]
    ,t.[voucher_id]
    FROM [HO_DATA].[dbo].[transactions] t
     join [HO_DATA].[dbo].[fleets] f on f.id = t.fleet_id
     join [HO_DATA].[dbo].[means] m on m.id = t.mean_id
     join [HO_DATA].[dbo].[depts] d on d.id = m.dept_id
    where f.status > 0 and m.status > 0 and d.status > 0
    order by [timestamp] desc
  ```