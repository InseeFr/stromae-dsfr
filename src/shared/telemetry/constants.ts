//Trace -> Le questionnaire

// Span -> Navigation
export type PageChangeEvent = {
  spanName: 'lunatic-page-change'
  attributes: ['pager'] //La nouvelle page
}
//Span -> Contrôle
export type ControlTriggered = {
  spanName: 'lunatic-control-triggered'
  attributes: ['pager', 'idControl']
}

//Span -> Modification d'une reponse
export type FormValueModified = {
  spanName: 'lunatic-value-modified'
  attributes: ['value', 'responseName']
}
//Span -> Démarrage de questionnaire
export type StartSurvey = {
  spanName: 'orchestrator-survey-started'
}

//
export type EndSurvey = {
  spanName: 'orchestrator-survey-ended'
  attributes: ['pager']
}
//
export type LeaveSurvey = {
  spanName: 'orchestrator-survey-leaved'
  attributes: ['pager']
}

//Survol
export type TooltipDisplay = {
  spanName: 'tooltip-display'
  attributes: 'idTooltip'
}

//Click sur un lien
export type OpenLink = {
  spanName: 'open-link'
  attributes: ['external', 'url']
}
