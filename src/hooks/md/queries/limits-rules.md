#### Limits Rules desde FHO

```sql
SELECT   
  r.[id], 
  r.[id] as limit_id, 
  r.[name], 
  1 as type, -- Limit Rule type: 1
  r.[description],
  r.[status], 
  r.[content_summary], 
  sr.[type] as limit_type,  -- 1: volume, 0: money
  sr.[single], 
  sr.[day], 
  sr.[week], 
  sr.[month], 
  sr.[year]
  FROM [HO_DATA].[dbo].[limits_rules] sr 
  JOIN [HO_DATA].[dbo].[rules] r on r.rule_id = sr.id 
  WHERE r.status > 0
  ```