"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ThemeToggle } from "@/components/theme-toggle"
import {
  Search,
  MapPin,
  Clock,
  DollarSign,
  Star,
  Users,
  Building2,
  GraduationCap,
  Heart,
  Filter,
  Plus,
  TrendingUp,
  Award,
  BookOpen,
  MessageCircle,
} from "lucide-react"

export default function SistemaEstagios() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedArea, setSelectedArea] = useState("")
  const [selectedCity, setSelectedCity] = useState("")

  const estagios = [
    {
      id: 1,
      instituicao: "Hospital das Clínicas",
      area: "Psicologia Hospitalar",
      cidade: "São Paulo",
      estado: "SP",
      avaliacao: 4.8,
      avaliacoes: 24,
      cargaHoraria: "20h/semana",
      remuneracao: "R$ 800,00",
      descricao: "Acompanhamento psicológico a pacientes internados e familiares",
      requisitos: "A partir do 6º semestre",
      contratacao: true,
      tags: ["Hospitalar", "Clínica", "Remunerado"],
    },
    {
      id: 2,
      instituicao: "Clínica Mente Sã",
      area: "Psicologia Clínica",
      cidade: "Rio de Janeiro",
      estado: "RJ",
      avaliacao: 4.6,
      avaliacoes: 18,
      cargaHoraria: "15h/semana",
      remuneracao: "Não remunerado",
      descricao: "Atendimento clínico supervisionado e grupos terapêuticos",
      requisitos: "A partir do 7º semestre",
      contratacao: false,
      tags: ["Clínica", "Terapia", "Supervisão"],
    },
    {
      id: 3,
      instituicao: "Escola Municipal Santos Dumont",
      area: "Psicologia Escolar",
      cidade: "Belo Horizonte",
      estado: "MG",
      avaliacao: 4.9,
      avaliacoes: 31,
      cargaHoraria: "25h/semana",
      remuneracao: "R$ 600,00",
      descricao: "Orientação educacional e apoio psicopedagógico",
      requisitos: "A partir do 5º semestre",
      contratacao: true,
      tags: ["Escolar", "Educação", "Remunerado"],
    },
  ]

  const areas = [
    "Psicologia Clínica",
    "Psicologia Hospitalar",
    "Psicologia Escolar",
    "Psicologia Organizacional",
    "Psicologia Social",
    "Psicologia Jurídica",
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Header */}
      <header className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-teal-100 dark:border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-teal-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  PsiEstágios
                </h1>
                <p className="text-sm text-muted-foreground">Conectando estudantes a oportunidades</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-teal-600">
                <MessageCircle className="w-4 h-4 mr-2" />
                Fórum
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-teal-600">
                <BookOpen className="w-4 h-4 mr-2" />
                Guias
              </Button>
              <ThemeToggle />
              <Avatar>
                <AvatarImage src="/placeholder.svg?height=32&width=32" />
                <AvatarFallback className="bg-gradient-to-r from-teal-500 to-blue-500 text-white">JS</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="buscar" className="space-y-8">
          <TabsList className="grid w-full grid-cols-4 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm border border-teal-100 dark:border-slate-700">
            <TabsTrigger
              value="buscar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Search className="w-4 h-4 mr-2" />
              Buscar Estágios
            </TabsTrigger>
            <TabsTrigger
              value="cadastrar"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Plus className="w-4 h-4 mr-2" />
              Cadastrar Estágio
            </TabsTrigger>
            <TabsTrigger
              value="perfil"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <Users className="w-4 h-4 mr-2" />
              Meu Perfil
            </TabsTrigger>
            <TabsTrigger
              value="dashboard"
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-teal-500 data-[state=active]:to-blue-500 data-[state=active]:text-white"
            >
              <TrendingUp className="w-4 h-4 mr-2" />
              Dashboard
            </TabsTrigger>
          </TabsList>

          {/* Buscar Estágios */}
          <TabsContent value="buscar" className="space-y-6">
            {/* Filtros */}
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-foreground">
                  <Filter className="w-5 h-5 mr-2 text-teal-600" />
                  Filtros de Busca
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Buscar</label>
                    <Input
                      placeholder="Nome da instituição..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Área</label>
                    <Select value={selectedArea} onValueChange={setSelectedArea}>
                      <SelectTrigger className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600">
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cidade</label>
                    <Select value={selectedCity} onValueChange={setSelectedCity}>
                      <SelectTrigger className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600">
                        <SelectValue placeholder="Selecione a cidade" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sao-paulo">São Paulo</SelectItem>
                        <SelectItem value="rio-janeiro">Rio de Janeiro</SelectItem>
                        <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-end">
                    <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                      <Search className="w-4 h-4 mr-2" />
                      Buscar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Lista de Estágios */}
            <div className="grid gap-6">
              {estagios.map((estagio) => (
                <Card
                  key={estagio.id}
                  className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700 hover:shadow-lg transition-all duration-300 hover:scale-[1.02] hover:border-teal-300 dark:hover:border-slate-600"
                >
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl text-foreground">{estagio.instituicao}</CardTitle>
                        <CardDescription className="text-lg font-medium text-teal-600 dark:text-teal-400">
                          {estagio.area}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-red-500">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{estagio.avaliacao}</span>
                          <span className="text-sm text-muted-foreground">({estagio.avaliacoes})</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <p className="text-muted-foreground">{estagio.descricao}</p>

                    <div className="flex flex-wrap gap-2">
                      {estagio.tags.map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">
                          {estagio.cidade}, {estagio.estado}
                        </span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{estagio.cargaHoraria}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{estagio.remuneracao}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <GraduationCap className="w-4 h-4 text-muted-foreground" />
                        <span className="text-foreground">{estagio.requisitos}</span>
                      </div>
                    </div>

                    <div className="flex justify-between items-center pt-4">
                      <div className="flex items-center space-x-2">
                        {estagio.contratacao && (
                          <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                            <Award className="w-3 h-3 mr-1" />
                            Possível contratação
                          </Badge>
                        )}
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-teal-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 bg-transparent"
                        >
                          Ver Detalhes
                        </Button>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white"
                        >
                          Entrar em Contato
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Cadastrar Estágio */}
          <TabsContent value="cadastrar">
            <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
              <CardHeader>
                <CardTitle className="text-2xl bg-gradient-to-r from-teal-600 to-blue-600 bg-clip-text text-transparent">
                  Cadastrar Novo Estágio
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Compartilhe uma oportunidade de estágio com outros estudantes
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Nome da Instituição *</label>
                    <Input
                      placeholder="Ex: Hospital das Clínicas"
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">CNPJ</label>
                    <Input
                      placeholder="00.000.000/0000-00"
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Área de Atuação *</label>
                    <Select>
                      <SelectTrigger className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600">
                        <SelectValue placeholder="Selecione a área" />
                      </SelectTrigger>
                      <SelectContent>
                        {areas.map((area) => (
                          <SelectItem key={area} value={area}>
                            {area}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Cidade *</label>
                    <Input
                      placeholder="Ex: São Paulo"
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Carga Horária Semanal *</label>
                    <Input
                      placeholder="Ex: 20h/semana"
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-foreground">Remuneração</label>
                    <Input
                      placeholder="Ex: R$ 800,00 ou Não remunerado"
                      className="bg-white/80 dark:bg-slate-700/80 border-teal-200 dark:border-slate-600"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Descrição das Atividades *</label>
                  <textarea
                    className="w-full min-h-[100px] p-3 border border-teal-200 dark:border-slate-600 rounded-md bg-white/80 dark:bg-slate-700/80 text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-teal-500"
                    placeholder="Descreva as principais atividades que o estagiário irá desenvolver..."
                  />
                </div>

                <div className="flex justify-end space-x-4">
                  <Button
                    variant="outline"
                    className="border-teal-200 dark:border-slate-600 text-teal-600 dark:text-teal-400 hover:bg-teal-50 dark:hover:bg-slate-700 bg-transparent"
                  >
                    Cancelar
                  </Button>
                  <Button className="bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                    Cadastrar Estágio
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Perfil */}
          <TabsContent value="perfil">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-2xl bg-gradient-to-r from-teal-500 to-blue-500 text-white">
                      JS
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-foreground">João Silva</CardTitle>
                  <CardDescription>Estudante de Psicologia - 7º Semestre</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Universidade Federal de São Paulo</p>
                    <p className="text-sm text-muted-foreground">joao.silva@unifesp.br</p>
                  </div>
                  <Button className="w-full bg-gradient-to-r from-teal-500 to-blue-600 hover:from-teal-600 hover:to-blue-700 text-white">
                    Editar Perfil
                  </Button>
                </CardContent>
              </Card>

              <div className="lg:col-span-2 space-y-6">
                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-foreground">Meus Estágios</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div>
                          <h4 className="font-medium text-foreground">Clínica Mente Sã</h4>
                          <p className="text-sm text-muted-foreground">Psicologia Clínica • Concluído</p>
                        </div>
                        <Badge className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                          Concluído
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                        <div>
                          <h4 className="font-medium text-foreground">Hospital das Clínicas</h4>
                          <p className="text-sm text-muted-foreground">Psicologia Hospitalar • Em andamento</p>
                        </div>
                        <Badge className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                          Em andamento
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
                  <CardHeader>
                    <CardTitle className="text-foreground">Áreas de Interesse</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                      >
                        Psicologia Clínica
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                      >
                        Psicologia Hospitalar
                      </Badge>
                      <Badge
                        variant="secondary"
                        className="bg-teal-100 dark:bg-teal-900 text-teal-700 dark:text-teal-300"
                      >
                        Terapia Cognitiva
                      </Badge>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>

          {/* Dashboard */}
          <TabsContent value="dashboard">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <Card className="bg-gradient-to-r from-teal-500 to-teal-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-teal-100">Total de Estágios</p>
                      <p className="text-3xl font-bold">1,247</p>
                    </div>
                    <Building2 className="w-8 h-8 text-teal-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-cyan-100">Estudantes Ativos</p>
                      <p className="text-3xl font-bold">3,891</p>
                    </div>
                    <Users className="w-8 h-8 text-cyan-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-blue-100">Avaliação Média</p>
                      <p className="text-3xl font-bold">4.7</p>
                    </div>
                    <Star className="w-8 h-8 text-blue-200" />
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-emerald-100">Novos Esta Semana</p>
                      <p className="text-3xl font-bold">23</p>
                    </div>
                    <TrendingUp className="w-8 h-8 text-emerald-200" />
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-foreground">Estágios Mais Bem Avaliados</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {estagios.slice(0, 3).map((estagio, index) => (
                      <div key={estagio.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-gradient-to-r from-teal-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium text-foreground">{estagio.instituicao}</p>
                            <p className="text-sm text-muted-foreground">{estagio.area}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-medium text-foreground">{estagio.avaliacao}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm border-teal-100 dark:border-slate-700">
                <CardHeader>
                  <CardTitle className="text-foreground">Distribuição por Área</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {areas.slice(0, 5).map((area, index) => (
                      <div key={area} className="flex items-center justify-between">
                        <span className="text-sm text-foreground">{area}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                            <div
                              className="h-full bg-gradient-to-r from-teal-500 to-blue-500 rounded-full"
                              style={{ width: `${Math.random() * 80 + 20}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium text-foreground">
                            {Math.floor(Math.random() * 200 + 50)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
