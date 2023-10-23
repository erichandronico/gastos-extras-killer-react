#### Time Rules desde FHO
```sql
WITH time_ranges_cte AS (
    SELECT [id], [from1], [to1]
    FROM [HO_DATA].[dbo].[time_ranges]
)
SELECT 
    r.[id],
    r.[id] as rule_id,
    r.[name],
    r.[rule_type] as list_type,     -- permitido: 1 denegado: 0
    r.[description],
    r.[status],
    r.[content_summary],
    0 [type],                       -- Time rules type: 0
    JSON_QUERY((SELECT tr_monday.from1 AS [from], tr_monday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )) AS monday_range,
    JSON_QUERY((SELECT tr_tuesday.from1 AS [from], tr_tuesday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tuesday_range,
    JSON_QUERY((SELECT tr_wednesday.from1 AS [from], tr_wednesday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS wednesday_range,
    JSON_QUERY((SELECT tr_thursday.from1 AS [from], tr_thursday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS thursday_range,
    JSON_QUERY((SELECT tr_friday.from1 AS [from], tr_friday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS friday_range,
    JSON_QUERY((SELECT tr_saturday.from1 AS [from], tr_saturday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saturday_range,
    JSON_QUERY((SELECT tr_sunday.from1 AS [from], tr_sunday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS sunday_range
FROM [HO_DATA].[dbo].[times_rules] tr 
JOIN [HO_DATA].[dbo].[rules] r ON r.id = tr.id 
LEFT JOIN time_ranges_cte tr_monday ON tr_monday.id = tr.monday
LEFT JOIN time_ranges_cte tr_tuesday ON tr_tuesday.id = tr.tuesday
LEFT JOIN time_ranges_cte tr_wednesday ON tr_wednesday.id = tr.wednesday
LEFT JOIN time_ranges_cte tr_thursday ON tr_thursday.id = tr.thursday
LEFT JOIN time_ranges_cte tr_friday ON tr_friday.id = tr.friday
LEFT JOIN time_ranges_cte tr_saturday ON tr_saturday.id = tr.saturday
LEFT JOIN time_ranges_cte tr_sunday ON tr_sunday.id = tr.sunday
WHERE r.[status] > 0

```