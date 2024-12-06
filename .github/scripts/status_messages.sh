#!/bin/bash

# URL del Webhook de Google Chat
WEBHOOK_URL="https://chat.googleapis.com/v1/spaces/AAAAEWSG_ps/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=K4PsgVhTLeGm7XGUvc4CqmWPMUqM7CY5KAjHZg6jbVs"

# Función para enviar mensaje
send_message() {
  local message="$1"
  curl -X POST -H 'Content-Type: application/json' \
       -d "{\"text\": \"$message\"}" \
       $WEBHOOK_URL
}

# Manejar los parámetros
case "$1" in
  "errorqa")
    MENSAJE="🤖🚨 BUILD: Error en el build revisar codigo/repositorio Sitio VentaDigital FrontEnd ambiente QA 🚫"
    send_message "$MENSAJE"
    ;;
  "errordevelop")
    MENSAJE="🤖🚨 BUILD: Error en el build revisar codigo/repositorio Sitio VentaDigital FrontEnd ambiente develop 🚫"
    send_message "$MENSAJE"
    ;;
  "erroruat")
    MENSAJE="🤖🚨 BUILD: Error en el build revisar codigo/repositorio Sitio VentaDigital FrontEnd ambiente UAT 🚫"
    send_message "$MENSAJE"
    ;;

  "successqa")
    MENSAJE="🤖🚨BUILD: Finalizado con Exito Sitio VentaDigital FrontEnd ambiente QA ✅"
    send_message "$MENSAJE"
    ;;

  "successdevelop")
    MENSAJE="🤖🚨BUILD: Finalizado con Exito Sitio VentaDigital FrontEnd ambiente develop ✅"
    send_message "$MENSAJE"
    ;;

  "successuat")
    MENSAJE="🤖🚨BUILD: Finalizado con Exito Sitio VentaDigital FrontEnd ambiente UAT ✅"
    send_message "$MENSAJE"
    ;;

  "errordeploy")
    MENSAJE="🤖🚨 DEPLOY: Error en el deploy Sitio VentaDigital FrontEnd ambiente QA revisar consola 🚫"
    send_message "$MENSAJE"
    ;;

  "startdeployqa")
    MENSAJE="🤖🚨 DEPLOY: Comienza despliegue Sitio VentaDigital FrontEnd ambiente QA 🚀"
    send_message "$MENSAJE"
    ;;
  "startdeployuat")
    MENSAJE="🤖🚨 DEPLOY: Comienza despliegue Sitio VentaDigital FrontEnd ambiente UAT 🚀"
    send_message "$MENSAJE"
    ;;
  "startdeploydevelop")
    MENSAJE="🤖🚨 DEPLOY: Comienza despliegue Sitio VentaDigital FrontEnd ambiente develop 🚀"
    send_message "$MENSAJE"
    ;;

  "startbuildqa")
    MENSAJE="🤖🚨 BUILD: Comienza build Sitio VentaDigital FrontEnd ambiente QA 🚀"
    send_message "$MENSAJE"
    ;;
  "startbuilddevelop")
    MENSAJE="🤖🚨 BUILD: Comienza build Sitio VentaDigital FrontEnd ambiente develop 🚀"
    send_message "$MENSAJE"
    ;;
  "startbuilduat")
    MENSAJE="🤖🚨 BUILD: Comienza build Sitio VentaDigital FrontEnd ambiente uat 🚀"
    send_message "$MENSAJE"
    ;;

  "finishedqa")
    GIT_TAG_LATEST=$(jq -r '.version' < "./package.json")
    echo "Ultima Versión: $GIT_TAG_LATEST"
    MENSAJE="🤖🚨 Despliegue finalizado: Nueva versión: $GIT_TAG_LATEST 🛠️(Ambiente QA) Validar https://172.24.32.32:448/ProquifaDotNet/login"
    send_message "$MENSAJE"
    ;;

  "finisheddevelop")
    GIT_TAG_LATEST=$(jq -r '.version' < "./package.json")
    echo "Ultima Versión: $GIT_TAG_LATEST"
    MENSAJE="🤖🚨 Despliegue finalizado: Nueva versión: $GIT_TAG_LATEST 🛠️(Ambiente DEV) Validar https://192.168.2.47:443/ProquifaDotNet/login"
    send_message "$MENSAJE"
    ;;

  "finisheduat")
    GIT_TAG_LATEST=$(jq -r '.version' < "./package.json")
    echo "Ultima Versión: $GIT_TAG_LATEST"
    MENSAJE="🤖🚨 Despliegue finalizado: Nueva versión: $GIT_TAG_LATEST 🛠️(Ambiente UAT) Validar https://172.24.32.35:442/VentaDigitalFront/"
    send_message "$MENSAJE"
    ;;
  *)
    echo "Parametros: $0 {success|error|startbuild|finished|startdeploy}"
    ;;
esac
