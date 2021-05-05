import * as core from '@actions/core'
import Twitter from 'twitter'

function validateInput(name: string): void {
  if (!core.getInput(name)) throw new Error(`${name} is a required input`)
}

async function run(): Promise<void> {
  try {
    validateInput('status')
    validateInput('consumer-key')
    validateInput('consumer-secret')
    validateInput('access-token')
    validateInput('access-token-secret')
    validateInput('url-link')

    const twitter = new Twitter({
      consumer_key: core.getInput('consumer-key'),
      consumer_secret: core.getInput('consumer-secret'),
      access_token_key: core.getInput('access-token'),
      access_token_secret: core.getInput('access-token-secret')
    })

    const statusEnv = new String(core.getInput('status'))

    const hashTagEnv = new String(core.getInput('hashTag'))
    const personTagEnv = new String(core.getInput('personTag'))
    const datevalue = new Date()
    const monthValue = datevalue.getMonth()
    const yearValue = datevalue.getFullYear()
    const dayValue = datevalue.getDate() - 1

    const months = [
      'january',
      'february',
      'march',
      'april',
      'may',
      'june',
      'july',
      'august',
      'september',
      'october',
      'november',
      'december'
    ]

    const statusDate = `${yearValue} /  ${months[monthValue]}  / ${dayValue}`

    const urlLink = core.getInput('url-link')
    const fileLink = `${urlLink}case-update-${months[monthValue]}-${dayValue}`

    let twitterStatus = ''
    twitterStatus += `${statusEnv}${statusDate}  : ${fileLink} : ${hashTagEnv} ${personTagEnv}`

    twitter.post(
      '/statuses/update',
      {status: twitterStatus},
      (error, data, response) => {
        if (error) throw error

        console.log(data)
        console.log(response)
      }
    )
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
