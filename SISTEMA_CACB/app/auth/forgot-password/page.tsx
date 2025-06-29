"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ThemeToggle } from "@/components/theme-toggle"
import { GraduationCap, Mail, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simular envio de email
    setTimeout(() => {
      setIsLoading(false)
      setEmailSent(true)
    }, 2000)
  }

  const handleResendEmail = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 flex items-center justify-center p-4">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] opacity-5"></div>

      {/* Header */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
        <Link
          href="/auth/login"
          className="flex items-center space-x-2 text-foreground hover:text-teal-600 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Voltar ao login</span>
        </Link>
        <ThemeToggle />
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-to-r from-teal-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg">
            <GraduationCap className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
            PsiEstágios
          </h1>
          <p className="text-muted-foreground mt-2">Recuperar senha</p>
        </div>

        {/* Forgot Password Form */}
        <Card className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-md border-teal-100 dark:border-slate-700 shadow-xl">
          {!emailSent ? (
            <>
              <CardHeader className="space-y-1 text-center">
                <CardTitle className="text-2xl font-bold text-foreground">Esqueceu sua senha?</CardTitle>
                <CardDescription>Digite seu e-mail e enviaremos instruções para redefinir sua senha</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-foreground">
                      E-mail
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="seu.email@universidade.edu.br"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600 focus:border-teal-500 focus:ring-teal-500"
                        required
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white font-medium py-2.5"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Enviando...</span>
                      </div>
                    ) : (
                      "Enviar Instruções"
                    )}
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    Lembrou da senha?{" "}
                    <Link
                      href="/auth/login"
                      className="text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                    >
                      Voltar ao login
                    </Link>
                  </p>
                </div>
              </CardContent>
            </>
          ) : (
            <>
              <CardHeader className="space-y-1 text-center">
                <div className="w-16 h-16 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-green-600 dark:text-green-400" />
                </div>
                <CardTitle className="text-2xl font-bold text-foreground">E-mail Enviado!</CardTitle>
                <CardDescription>
                  Enviamos as instruções para redefinir sua senha para{" "}
                  <span className="font-medium text-foreground">{email}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="bg-teal-50 dark:bg-teal-900/20 border border-teal-200 dark:border-teal-800 rounded-lg p-4">
                  <h4 className="font-medium text-teal-800 dark:text-teal-200 mb-2">Próximos passos:</h4>
                  <ol className="text-sm text-teal-700 dark:text-teal-300 space-y-1 list-decimal list-inside">
                    <li>Verifique sua caixa de entrada</li>
                    <li>Clique no link do e-mail</li>
                    <li>Crie uma nova senha</li>
                    <li>Faça login com a nova senha</li>
                  </ol>
                </div>

                <div className="text-center space-y-4">
                  <p className="text-sm text-muted-foreground">Não recebeu o e-mail?</p>
                  <Button
                    variant="outline"
                    onClick={handleResendEmail}
                    disabled={isLoading}
                    className="border-teal-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 bg-transparent"
                  >
                    {isLoading ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
                        <span>Reenviando...</span>
                      </div>
                    ) : (
                      "Reenviar E-mail"
                    )}
                  </Button>
                </div>

                <div className="text-center">
                  <Link
                    href="/auth/login"
                    className="text-sm text-teal-600 hover:text-teal-700 dark:text-teal-400 dark:hover:text-teal-300 font-medium"
                  >
                    Voltar ao login
                  </Link>
                </div>
              </CardContent>
            </>
          )}
        </Card>

        {/* Help Section */}
        <Card className="mt-6 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border-teal-100 dark:border-slate-700">
          <CardContent className="p-4">
            <h4 className="font-medium text-foreground mb-2">Precisa de ajuda?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Se você continuar tendo problemas para acessar sua conta, entre em contato conosco.
            </p>
            <Button
              variant="outline"
              size="sm"
              className="border-teal-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 bg-transparent"
            >
              Contatar Suporte
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
