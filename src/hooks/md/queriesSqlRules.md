#### Limits Rules desde FHO

```sql
SELECT   r.[id], r.[name], r.[rule_type], r.[description], r.[status], r.[content_summary], sr.[single], sr.[day], sr.[week], sr.[month], sr.[type], sr.[year]
  FROM [HO_DATA].[dbo].[limits_rules] sr 
  JOIN rules r on r.rule_id = sr.id 
  WHERE r.status > 0
  ```

#### Fuel Rules desde FHO
```sql
SELECT 
    r.[id],
    r.[id] as list_id,
    r.[name],
    r.[rule_type],
    r.[description],
    r.[status],
    r.[content_summary],
    fr.[type] as list_type,
    (SELECT [code] FROM products WHERE id = fr.[f1]) AS  code_f1,
    (SELECT [code] FROM products WHERE id = fr.[f2]) AS  code_f2,
    (SELECT [code] FROM products WHERE id = fr.[f3]) AS  code_f3,
    (SELECT [code] FROM products WHERE id = fr.[f4]) AS  code_f4,
    (SELECT [code] FROM products WHERE id = fr.[f5]) AS  code_f5,
    (SELECT [code] FROM products WHERE id = fr.[f6]) AS  code_f6,
    (SELECT [code] FROM products WHERE id = fr.[f7]) AS  code_f7,
    (SELECT [code] FROM products WHERE id = fr.[f8]) AS  code_f8,
    (SELECT [code] FROM products WHERE id = fr.[f9]) AS  code_f9,
    (SELECT [code] FROM products WHERE id = fr.[f10]) AS code_f10,
    (SELECT [code] FROM products WHERE id = fr.[f11]) AS code_f11,
    (SELECT [code] FROM products WHERE id = fr.[f12]) AS code_f12
FROM [HO_DATA].[dbo].[fuels_rules] fr 
JOIN rules r ON r.id = fr.id 
WHERE r.[status] > 0
```

#### Visits Rules desde FHO
```sql
SELECT r.[id], r.[id] as list_id, r.[name], r.[rule_type], r.[description], r.[status], r.[content_summary], vr.[day], vr.[week], vr.[month]
FROM [HO_DATA].[dbo].[visits_rules] vr 
JOIN rules r ON r.id = vr.id 
WHERE r.[status] > 0
```

#### Time Rules desde FHO
```sql
WITH time_ranges_cte AS (
    SELECT [id], [from1], [to1]
    FROM [HO_DATA].[dbo].[time_ranges]
)
SELECT 
    r.id,
    r.id as list_id,
    r.name,
    r.rule_type,
    r.description,
    r.status,
    r.content_summary,
    tr.[type],
    JSON_QUERY((SELECT tr_monday.from1 AS [from], tr_monday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER )) AS monday_range,
    JSON_QUERY((SELECT tr_tuesday.from1 AS [from], tr_tuesday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS tuesday_range,
    JSON_QUERY((SELECT tr_wednesday.from1 AS [from], tr_wednesday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS wednesday_range,
    JSON_QUERY((SELECT tr_thursday.from1 AS [from], tr_thursday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS thursday_range,
    JSON_QUERY((SELECT tr_friday.from1 AS [from], tr_friday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS friday_range,
    JSON_QUERY((SELECT tr_saturday.from1 AS [from], tr_saturday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS saturday_range,
    JSON_QUERY((SELECT tr_sunday.from1 AS [from], tr_sunday.to1 AS [to] FOR JSON PATH, WITHOUT_ARRAY_WRAPPER)) AS sunday_range
FROM [HO_DATA].[dbo].[times_rules] tr 
JOIN rules r ON r.id = tr.id 
LEFT JOIN time_ranges_cte tr_monday ON tr_monday.id = tr.monday
LEFT JOIN time_ranges_cte tr_tuesday ON tr_tuesday.id = tr.tuesday
LEFT JOIN time_ranges_cte tr_wednesday ON tr_wednesday.id = tr.wednesday
LEFT JOIN time_ranges_cte tr_thursday ON tr_thursday.id = tr.thursday
LEFT JOIN time_ranges_cte tr_friday ON tr_friday.id = tr.friday
LEFT JOIN time_ranges_cte tr_saturday ON tr_saturday.id = tr.saturday
LEFT JOIN time_ranges_cte tr_sunday ON tr_sunday.id = tr.sunday
WHERE r.[status] > 0

```