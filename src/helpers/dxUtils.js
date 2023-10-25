
export const onPointClickfn          = ({target}) => target.select()
export const toggleLegendVisibility  = ({target}) => target?.isVisible() ? target.hide() : target.show()

export const tooltipFn = ({argumentText, seriesName, value}) => {

    return { html: `
        <div>
          <div class='text-md font-semibold'>${ argumentText }</div>
          <div>
            ${ seriesName }: ${parseInt(value/1000)}K
          </div>
        </div>`
      }
  }